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
import { addWallet } from "../service/DataService";

class AddWalletModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      walletName: "",
    };
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  handleConfirm() {
    console.log("confirming");
    addWallet({ name: this.state.walletName, balance: "0" }).then(() => {
      this.props.refreshWallets();
      this.props.handleClose();
    });
  }

  handleClose() {
    this.setState({ walletName: "" });
    this.props.handleClose();
  }

  handleTextFieldChange(e) {
    this.setState({ walletName: e.target.value });
  }

  render() {
    return (
      <Dialog
        maxWidth="sm"
        fullWidth
        open={this.props.open}
        onClose={this.handleClose}
      >
        <DialogTitle>Add wallet</DialogTitle>
        <DialogContent>
          <DialogContentText>Name the new wallet</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            value={this.state.walletName}
            onChange={this.handleTextFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddWalletModal;
