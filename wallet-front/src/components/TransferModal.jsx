import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { transferFunds } from "../service/DataService";

class TransferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "0",
      toWalletId: undefined,
    };
    this.handleTransferFunds = this.handleTransferFunds.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleToWalletChange = this.handleToWalletChange.bind(this);
  }

  handleTransferFunds() {
    transferFunds(
      this.props.fromWalletId,
      this.state.toWalletId,
      this.state.amount
    ).then(() => {
      this.props.refreshWallets();
      this.props.handleClose();
    });
  }

  handleClose() {
    this.setState({ amount: "0" });
    this.setState({ toWalletId: undefined });
    this.props.handleClose();
  }

  handleAmountChange(e) {
    this.setState({ amount: e.target.value });
  }

  handleToWalletChange(e) {
    this.setState({ toWalletId: e.target.value });
  }

  render() {
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={this.props.open}
        onClose={this.handleClose}
      >
        <DialogTitle>Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can transfer funds from one wallet to another.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Please enter amount in €"
            fullWidth
            variant="standard"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          />

          <TextField
            id="outlined-select-currency"
            select
            label="Choose wallet"
            value={this.state.toWalletId}
            onChange={this.handleToWalletChange}
            helperText="Please select target wallet"
          >
            {this.props.wallets
              .filter((wallet) => wallet.id !== this.props.fromWalletId)
              .map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.handleTransferFunds}>Transfer</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TransferModal;
