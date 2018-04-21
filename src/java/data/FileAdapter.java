/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import bl.Movie;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 *
 * @author Yousef
 */
public class FileAdapter {

    private String moviesFilePath ="resources/movies.json";
    
    public FileAdapter(){

    }
    
    /**
     * reads and convert string from movies file to list of movies objects
     * @return 
     */
    public List<Movie> loadMovies(){
        Gson gson = new Gson();
        String fileContent = read(moviesFilePath);
        List<Movie> movies = gson.fromJson(fileContent, new TypeToken<List<Movie>>() {
        }.getType());
        return movies;
    }

    /**
     * Reads file from a given filePath
     * @param filePath
     * @return 
     */
    public String read(String filePath) {
        String result="";
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            filePath = classLoader.getResource(filePath).getFile();
            FileReader reader = new FileReader(filePath);
            BufferedReader bufferedReader = new BufferedReader(reader);

            String line="";
            while ((line = bufferedReader.readLine()) != null) {
                result+=line;
            }
            reader.close();
 
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
    
    
    /**
     * Writes to file from a given filePath
     * @param filePath
     * @param data
     * @return 
     */
    public boolean write(String filePath, String data) {
        try {
            boolean overwrite = false;
            File file = new File(filePath);
            if (!file.exists()) {
                if(!file.getParentFile().exists())//mkparent dir if not exist
                    file.getParentFile().mkdirs();
                overwrite = true;
            }
            FileWriter writer = new FileWriter(filePath, overwrite);
            BufferedWriter bufferedWriter = new BufferedWriter(writer);
 
            bufferedWriter.write(data);
            bufferedWriter.close();
            return true;
        } catch (IOException e) {
            //e.printStackTrace();
            return false;
        }
    }
    
   /* public static void main(String[] args){
        String moviesFilePath ="resources/movies.json";
        FileAdapter file = new FileAdapter();
        List<Movie> movies = file.loadMovies();
        
        for(Movie m: movies){
            System.out.println(m.getName());
        }
        
        for(int i=0;i<movies.size();i++){
            Movie m =movies.get(i);
            System.out.println(m);
        }
        
    }*/
  
}
