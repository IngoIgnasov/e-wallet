package com.project.wallet.controller;

import com.project.wallet.model.Wallet;
import com.project.wallet.repository.WalletRepository;
import com.project.wallet.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
public class WalletController {
    private WalletRepository walletRepository;
    private WalletService walletService;

    @Autowired
    public WalletController(WalletRepository walletRepository, WalletService walletService) {
        this.walletRepository = walletRepository;
        this.walletService = walletService;
    }

    @GetMapping("/wallet")
    Iterable<Wallet> all() {
        return walletRepository.findAll();
    }

    @GetMapping("/wallet/{id}")
    Wallet walletById(@PathVariable Long id) {
        return walletRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND));
    }

    @PostMapping("/wallet")
    Wallet save(@RequestBody Wallet wallet) {
        return walletRepository.save(wallet);
    }

    @PostMapping("/wallet/{id}/funds/add/{amount}")
    Wallet addFunds(@PathVariable Long id, @PathVariable Double amount) {
        return walletService.addFunds(id, amount);
    }

    @PostMapping("/wallet/{fromId}/transfer/{toId}funds/{amount}")
    Wallet transferFunds(@PathVariable Long fromId, @PathVariable Long toId, @PathVariable Double amount) throws Exception {
        return walletService.transferFunds(fromId, toId, amount);
    }

    @PostMapping("/wallet/{id}/funds/remove/{amount}")
    Wallet removeFunds(@PathVariable Long id, @PathVariable Double amount) throws Exception {
        return walletService.removeFunds(id, amount);
    }

    @DeleteMapping("/wallet/{id}")
    void deleteWallet(@PathVariable Long id) throws Exception {
        walletRepository.deleteById(id);
    }
}
