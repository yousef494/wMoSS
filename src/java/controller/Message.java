/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.util.List;

/**
 *
 * @author Yousef
 */
public class Message {
    
    private String result;
    private String message;
    private String view;
    private String postType;
    private Object record;
    private List<Object> records;
    private Integer recordsTotal;
    private Integer recordsFilteredTotal;

    
    public Message() {
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

    public List<Object> getRecords() {
        return records;
    }

    public void setRecords(List<Object> records) {
        this.records = records;
        this.recordsTotal = records.size();
    }

    public Integer getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(Integer recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public Integer getRecordsFilteredTotal() {
        return recordsFilteredTotal;
    }

    public void setRecordsFilteredTotal(Integer recordsFilteredTotal) {
        this.recordsFilteredTotal = recordsFilteredTotal;
    }

    @Override
    public String toString() {
        return "Communication{" + "result=" + result + ", message=" + message + ", view=" + view + ", postType=" + postType + ", record=" + record + ", records=" + records + ", recordsTotal=" + recordsTotal + ", recordsFilteredTotal=" + recordsFilteredTotal + '}';
    }

    
    
    

 
}
