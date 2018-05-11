/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bl;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Yousef
 */
public class Cart {


    private List<Movie> items;
    private List<Integer> quants;
    private List<Seat> seats;
    private double subTotal;
    private double total;

    public Cart() {
        items = new ArrayList<Movie>();
        quants = new ArrayList<Integer>();
        seats = new ArrayList<Seat>();
        subTotal = 0;
        total = 0;
    }

    public List<Movie> getItems() {
        return items;
    }

    public void setItems(List<Movie> items) {
        this.items = items;
    }

    public List<Integer> getQuants() {
        return quants;
    }

    public void setQuants(List<Integer> quants) {
        this.quants = quants;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public void addItem(String movieName) {

    }


    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    
    

    public void addItem(Movie movie, int quantity, Seat selectedSeats) {
        int index = items.indexOf(movie);
        if (index == -1) {
            items.add(movie);
            quants.add(quantity);
            seats.add(selectedSeats);
        } else {
            int oldQuantity = quants.get(index);
            quants.set(index, oldQuantity + quantity);
            Seat oldSeats = seats.get(index);
            oldSeats.addSeats(selectedSeats);
            seats.set(index, oldSeats);
        }
    }

    public void deleteItem(String name) {
        int index = items.indexOf(new Movie(name));
        items.remove(index);
        quants.remove(index);
        seats.remove(index);
    }

    public void updateQuantity(String name, int quantity) {
        int index = items.indexOf(new Movie(name));
        quants.set(index, quantity);  
    }

    @Override
    public String toString() {
        return "Cart{" + "items=" + items + ", quants=" + quants + ", subTotal=" + subTotal + ", total=" + total + '}';
    }
    
    

}
