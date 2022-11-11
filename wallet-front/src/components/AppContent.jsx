import React, { Component } from "react";
import { getAllWallets } from "../service/DataService";
import { Button, Box, Typography, Container } from "@mui/material";
import AddWalletModal from "./AddWalletModal";
import Wallets from "./Wallets";

class AppContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallets: [],
      addWalletModalOpen: false,
    };
    this.refreshWallets = this.refreshWallets.bind(this);
    this.handleOpenAddWalletModal = this.handleOpenAddWalletModal.bind(this);
    this.handleCloseAddWalletModal = this.handleCloseAddWalletModal.bind(this);
  }

  componentDidMount() {
    this.refreshWallets();
  }

  refreshWallets() {
    getAllWallets().then((response) => {
      this.setState({ wallets: response.data });
      console.log("after request", this.state.wallets);
    });
  }

  handleOpenAddWalletModal() {
    this.setState({ addWalletModalOpen: true });
  }
  handleCloseAddWalletModal() {
    this.setState({ addWalletModalOpen: false });
  }

  render() {
    return (
      <Container className="App-content">
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={this.handleOpenAddWalletModal}
          >
            + Add wallet
          </Button>
        </div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {this.state.wallets.length > 0 ? (
            <Wallets
              refreshWallets={this.refreshWallets}
              wallets={this.state.wallets}
            ></Wallets>
          ) : (
            <Typography variant="h4" component="h1" gutterBottom>
              You have no wallets. Add a wallet to get started.
            </Typography>
          )}
        </Box>

        <AddWalletModal
          open={this.state.addWalletModalOpen}
          handleClose={this.handleCloseAddWalletModal}
          refreshWallets={this.refreshWallets}
        ></AddWalletModal>
      </Container>
    );
  }
}

export default AppContent;
