/*
 * Booked seats class
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bl;

import java.util.List;

/**
 *
 * @author Yousef
 */
public class BookedSeats {
    
    public String session;
    public List<String> seats;

    public String getSession() {
        return session;
    }

    public void setSession(String session) {
        this.session = session;
    }

    public List<String> getSeats() {
        return seats;
    }

    public void setSeats(List<String> seats) {
        this.seats = seats;
    }
    
    
    
}
