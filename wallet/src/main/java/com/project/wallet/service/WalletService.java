package com.project.wallet.service;

import com.project.wallet.model.Wallet;
import com.project.wallet.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

@Service
public class WalletService {
    private final WalletRepository walletRepository;

    @Autowired
    public WalletService(WalletRepository walletRepository){
        this.walletRepository = walletRepository;
    }

    @Transactional
    public Wallet addFunds(Long id, Double amount){
        Wallet wallet = getWallet(id);
        wallet.increaseBalance(amount);
        return walletRepository.save(wallet);
    }

    @Transactional
    public Wallet removeFunds(Long id, Double amount) throws Exception {
        Wallet wallet = getWallet(id);
        wallet.reduceBalance(amount);
        return walletRepository.save(wallet);
    }

    @Transactional
    public Wallet transferFunds(Long fromId, Long toId, Double amount) throws Exception {
        Wallet fromWallet = getWallet(fromId);
        Wallet toWallet = getWallet(toId);
        fromWallet.reduceBalance(amount);
        toWallet.increaseBalance(amount);
        walletRepository.save(fromWallet);
        return walletRepository.save(toWallet);
    }

    private Wallet getWallet(Long id) {
        return walletRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND));
    }

}
