/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import bl.Movie;
import java.util.List;

/**
 * This class is responsible for holding object conversation between UI and the backend
 */
public class Message {
    
    private String result;//OK/ERROR
    private String message;//e.g. ERROR message
    private String view;//view type e.g. Movies, Cart
    private String postType;//add/edit/delete/view/search/find/...
    private Object record;//Single movie/session entry
    private List<Movie> records;//Multiple moives/sessions entries
    private Integer recordsTotal;//Number of records/entries

    
    public Message() {
        Integer i = 0;
        Integer[] ar;
        List<Integer> l;
    }
    
    public Message(String result) {
        this.result = result;
    }

    public Message(String result, String message) {
        this.result = result;
        this.message = message;
    }


    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
    
    public void setResult(boolean result, String message) {
        this.result = result?"OK":"ERROR";
        this.message = result?"":message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getView() {
        return view;
    }

    public void setView(String view) {
        this.view = view;
    }

    public String getPostType() {
        return postType;
    }

    public void setPostType(String postType) {
        this.postType = postType;
    }

    public Object getRecord() {
        return record;
    }

    public void setRecord(Object record) {
        this.record = record;
    }

    public List<Movie> getRecords() {
        return records;
    }

    public void setRecords(List<Movie> records) {
        this.records = records;
        this.recordsTotal = records.size();
    }

    public Integer getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(Integer recordsTotal) {
        this.recordsTotal = recordsTotal;
    }


    @Override
    public String toString() {
        return "Communication{" + "result=" + result + ", message=" + message + ", view=" + view + ", postType=" + postType + ", record=" + record + ", records=" + records + ", recordsTotal=" + recordsTotal + '}';
    }

    
    
    

 
}
