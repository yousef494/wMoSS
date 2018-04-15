/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package data;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;

/**
 *
 * @author Yousef
 */
public class FileAdapter {

    
    public String read(String filePath) {
        String result="";
        try {
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
    
    
  
}
