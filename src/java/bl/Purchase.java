/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bl;

import java.util.List;
import java.util.Random;

/**
 *
 * @author Yousef
 */
public class Purchase {

    private String name;
    private String address;
    private String email;
    private String cardNumber;
    private Cart order;
    private String refrenceNumber;

    public Purchase(String name, String address, String email, String cardNumber) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.cardNumber = cardNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Cart getOrder() {
        return order;
    }

    public void setOrder(Cart order) {
        this.order = order;
    }

    public String getRefrenceNumber() {
        return refrenceNumber;
    }

    public void setRefrenceNumber(String refrenceNumber) {
        this.refrenceNumber = refrenceNumber;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String generateRefrenceNumber() {
        Random random = new Random();
        return ""+Integer.toString(Math.abs(random.nextInt()));
    }

    
    
}
