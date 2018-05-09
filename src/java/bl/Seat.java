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
public class Seat {
    private List<String> seats;

    public Seat() {
        seats = new ArrayList<String>();
        
    }
    
    public Seat(List<String> seatsList) {
        seats = seatsList;
        
    }
    
    public void addSeats(Seat seatsObj){
        seats.addAll(seatsObj.getSeats());
    }

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats;
    }

    @Override
    public String toString() {
        return "Seat{" + "seats=" + seats + '}';
    }
    
    
    
}
