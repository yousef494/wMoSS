/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bl;

import data.FileAdapter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Yousef
 */
public class Search {

    /**
     * Helper method Find single movie by name
     *
     * @param name
     * @return
     */
    public Movie find(String name) {
        FileAdapter fileAdapter = new FileAdapter();
        List<Movie> movies = fileAdapter.loadMovies();
        return find(movies, name);
    }

    /**
     * Find single movie by name from given list of movie
     *
     * @param movies
     * @param name
     * @return
     */
    private Movie find(List<Movie> movies, String name) {
        for (int i = 0; i < movies.size(); i++) {
            if (movies.get(i).getName().contains(name)) {
                return movies.get(i);
            }
        }
        return null;
    }

    /**
     * Helper method Find multiple movies by name
     *
     * @param name
     * @return
     */
    public List<Movie> search(String name) {
        FileAdapter fileAdapter = new FileAdapter();
        List<Movie> movies = fileAdapter.loadMovies();
        return search(movies, name);
    }

    /**
     * Find multiple movies by name
     *
     * @param movies
     * @param name
     * @return
     */
    private List<Movie> search(List<Movie> movies, String name) {
        List<Movie> founded = new ArrayList<Movie>();
        for (int i = 0; i < movies.size(); i++) {
            Movie m = movies.get(i);
            if (m.getName().toLowerCase().contains(name.toLowerCase())) {
                Date release = convertStringToDate(m.getRelease());
                if (isWithinXDaysInAdvance(7, release)) {
                    founded.add(m);
                }
            }
        }
        return founded;
    }

    /**
     * Helper method for searchByStatus Find multiple movies by status
     *
     * @param name
     * @return
     */
    public List<Movie> searchByStatus(String status) {
        FileAdapter fileAdapter = new FileAdapter();
        List<Movie> movies = fileAdapter.loadMovies();
        return searchByStatus(movies, status);
    }

    /**
     * Find multiple movies by status
     *
     * @param movies
     * @param name
     * @return
     */
    private List<Movie> searchByStatus(List<Movie> movies, String status) {
        List<Movie> founded = new ArrayList<Movie>();
        for (int i = 0; i < movies.size(); i++) {
            Movie m = movies.get(i);
            if (m.getStatus().toLowerCase().contains(status.toLowerCase())) {
                Date release = convertStringToDate(m.getRelease());
                if (isWithinXDaysInAdvance(7, release)) {
                    founded.add(m);
                }
            }
        }
        return founded;
    }

    
    public boolean isWithinXDaysInAdvance(int numberOfDays, Date release) {
        Date today = new Date();
        if(today.after(release))
            return true;
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(release);
        calendar.add(Calendar.DATE, -numberOfDays);
        Date timeToCompare = calendar.getTime();
        boolean diff = today.before(timeToCompare);
        return !diff;
    }

    /**
     * Adapted from previous work by Yousef 2017
     *
     * @param dateStr
     * @return
     */
    public Date convertStringToDate(String dateStr) {
        return convertStringToDate(dateStr, "dd/MM/yyyy", "dd/MM/yyyy");
    }

    /**
     * Adapted from previous work by Yousef 2017
     *
     * @param dateStr
     * @param inPattern
     * @param outPattern
     * @return
     */
    public Date convertStringToDate(String dateStr, String inPattern, String outPattern) {
        try {
            SimpleDateFormat inFormat = new SimpleDateFormat(inPattern);
            SimpleDateFormat outFormat = new SimpleDateFormat(outPattern);
            Date date = inFormat.parse(dateStr);
            String convertedDateStr = outFormat.format(date);
            Date convertedDate = outFormat.parse(convertedDateStr);
            return convertedDate;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
