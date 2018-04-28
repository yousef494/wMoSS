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
    private double subTotal;
    private double total;

    public Cart() {
        items = new ArrayList<Movie>();
        quants = new ArrayList<Integer>();
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

    public void addItem(Movie movie, int quantity) {
        int index = items.indexOf(movie);
        if (index == -1) {
            items.add(movie);
            quants.add(quantity);
        } else {
            int oldQuantity = quants.get(index);
            quants.set(index, oldQuantity + quantity);
        }
    }

    public void deleteItem(String name) {
        int index = items.indexOf(new Movie(name));
        items.remove(index);
        quants.remove(index);
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
