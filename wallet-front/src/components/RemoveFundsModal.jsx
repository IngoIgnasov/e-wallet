import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { removeFunds } from "../service/DataService";

class RemoveFundsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "0",
    };
    this.handleRemoveFunds = this.handleRemoveFunds.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  handleRemoveFunds() {
    removeFunds(this.props.walletId, this.state.amount).then(() => {
      this.props.refreshWallets();
      this.props.handleClose();
    });
  }

  handleClose() {
    this.setState({ amount: "0" });
    this.props.handleClose();
  }

  handleAmountChange(e) {
    this.setState({ amount: e.target.value });
  }

  render() {
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={this.props.open}
        onClose={this.handleClose}
      >
        <DialogTitle>Remove funds</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can remove funds from your e-wallet.
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.handleRemoveFunds}>Remove funds</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default RemoveFundsModal;
