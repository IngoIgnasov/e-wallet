import React, { Component } from "react";
import Wallet from "./Wallet";
import { Box } from "@mui/material";

class Wallets extends Component {
  render() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {this.props.wallets.map((wallet) => (
          <Wallet
            refreshWallets={this.props.refreshWallets}
            key={wallet.id}
            wallet={wallet}
            wallets={this.props.wallets}
          ></Wallet>
        ))}
      </Box>
    );
  }
}

export default Wallets;
