package com.project.wallet.model;

import javax.persistence.*;

@Entity
@Table(name = "wallet")
public class Wallet {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "balance", nullable = false)
    private Double balance;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public void increaseBalance(Double amount){
        this.balance += amount;
    }

    public void reduceBalance(Double amount) throws Exception {
        if(this.balance < amount){
            throw new Exception("Remaining balance can't fall below 0.");
        }
        this.balance -= amount;
    }
}