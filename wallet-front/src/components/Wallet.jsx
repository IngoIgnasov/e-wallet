import React, { Component } from "react";
import { Paper, Typography, Box, Button, IconButton } from "@mui/material";
import { addFunds, deleteWallet, removeFunds } from "../service/DataService";
import AddFundsModal from "./AddFundsModal";
import RemoveFundsModal from "./RemoveFundsModal";
import TransferModal from "./TransferModal";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferModalOpen: false,
      addFundsModalOpen: false,
      removeFundsModalOpen: false,
    };

    this.removeFunds = this.removeFunds.bind(this);
    this.addFunds = this.addFunds.bind(this);
    this.handleOpenTransferModal = this.handleOpenTransferModal.bind(this);
    this.handleCloseTransferModal = this.handleCloseTransferModal.bind(this);
    this.handleOpenAddFundsModal = this.handleOpenAddFundsModal.bind(this);
    this.handleCloseAddFundsModal = this.handleCloseAddFundsModal.bind(this);
    this.handleOpenRemoveFundsModal =
      this.handleOpenRemoveFundsModal.bind(this);
    this.handleCloseRemoveFundsModal =
      this.handleCloseRemoveFundsModal.bind(this);
  }

  addFunds(amount) {
    addFunds(amount);
  }

  removeFunds(amount) {
    removeFunds(amount);
  }

  deleteWallet(id) {
    console.log("deleting");
    deleteWallet(id).then(() => {
      this.props.refreshWallets();
    });
  }

  handleOpenTransferModal() {
    this.setState({ transferModalOpen: true });
  }
  handleCloseTransferModal() {
    this.setState({ transferModalOpen: false });
  }

  handleOpenAddFundsModal() {
    this.setState({ addFundsModalOpen: true });
  }
  handleCloseAddFundsModal() {
    this.setState({ addFundsModalOpen: false });
  }

  handleOpenRemoveFundsModal() {
    this.setState({ removeFundsModalOpen: true });
  }
  handleCloseRemoveFundsModal() {
    this.setState({ removeFundsModalOpen: false });
  }
  render() {
    return (
      <Paper
        sx={{
          m: 2,
          p: 1,
          display: "flex",
          height: "110px",
          width: "400px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Typography variant="h5">
            Wallet: <b>{this.props.wallet.name}</b>
          </Typography>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <div>
              <Typography variant="h6">
                Balance: <b>{this.props.wallet.balance}</b> €
              </Typography>
            </div>
            <IconButton
              size="small"
              aria-label="add funds"
              color="success"
              onClick={this.handleOpenAddFundsModal}
            >
              <AddCircleOutline />
            </IconButton>{" "}
            <IconButton
              size="small"
              aria-label="remove funds"
              color="warning"
              onClick={this.handleOpenRemoveFundsModal}
            >
              <RemoveCircleOutline />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={this.handleOpenTransferModal}
            sx={{ mr: 1 }}
          >
            Transfer funds
          </Button>
          <IconButton
            size="small"
            aria-label="delete"
            color="error"
            onClick={() => this.deleteWallet(this.props.wallet.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
        <AddFundsModal
          open={this.state.addFundsModalOpen}
          handleClose={this.handleCloseAddFundsModal}
          refreshWallets={this.props.refreshWallets}
          walletId={this.props.wallet.id}
        ></AddFundsModal>
        <RemoveFundsModal
          open={this.state.removeFundsModalOpen}
          handleClose={this.handleCloseRemoveFundsModal}
          refreshWallets={this.props.refreshWallets}
          walletId={this.props.wallet.id}
        ></RemoveFundsModal>
        <TransferModal
          open={this.state.transferModalOpen}
          handleClose={this.handleCloseTransferModal}
          refreshWallets={this.props.refreshWallets}
          fromWalletId={this.props.wallet.id}
          wallets={this.props.wallets}
        ></TransferModal>
      </Paper>
    );
  }
}

export default Wallet;
