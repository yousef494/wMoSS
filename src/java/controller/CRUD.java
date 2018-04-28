/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import bl.Cart;
import bl.Movie;
import bl.Search;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Yousef
 */
@WebServlet(name = "CRUD", urlPatterns = {"/CRUD"})
public class CRUD extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession(false);

        Gson gson = new Gson();//JSON
        Message message = new Message("Error", "CTR001");
        try {
            String postType = request.getParameter("postType");

            //represent single user story/function e.g.search
            if (postType.contentEquals("search")) {
                String query = request.getParameter("query");//get query form the user
                Search search = new Search();//process the request
                List<Movie> records = search.search(query);

                message.setResult("OK");//prepare for a response 
                message.setRecords(records);
                message.setRecordsTotal(records.size());

            } else if (postType.contentEquals("navigate")) {
                String query = request.getParameter("query");//get query form the user
                Search search = new Search();//process the request
                List<Movie> records = search.searchByStatus(query);

                message.setResult("OK");//prepare for a response 
                message.setRecords(records);
                message.setRecordsTotal(records.size());

            } else if (postType.contentEquals("view")) {
                Cart cart = (Cart)session.getAttribute("cart");
                if(cart == null){
                    cart = new Cart();
                }

                message.setResult("OK");//prepare for a response 
                message.setRecord(cart.getQuants());
                message.setRecords(cart.getItems());
                message.setRecordsTotal(cart.getItems().size());

            }else if (postType.contentEquals("add")) {
                String movieStr = request.getParameter("movie");//get query form the user
                Movie movie = gson.fromJson(movieStr, new TypeToken<Movie>() {
                }.getType());
                
                Cart cart = (Cart)session.getAttribute("cart");
                if(cart == null){
                    cart = new Cart();
                }
                cart.addItem(movie,1);
                session.setAttribute("cart", cart);

                message.setResult("OK");//prepare for a response 
                message.setRecord(movie);
                message.setRecordsTotal(1);

            }else if (postType.contentEquals("update")) {
                String movieName = request.getParameter("movieName");//get query form the user
                String quantity = request.getParameter("quantity");//get query form the user

                Cart cart = (Cart)session.getAttribute("cart");
                cart.updateQuantity(movieName,Integer.parseInt(quantity));
                session.setAttribute("cart", cart);

                message.setResult("OK");//prepare for a response 
                message.setRecord(movieName);
                message.setRecordsTotal(1);
            }else if (postType.contentEquals("delete")) {
                String movieName = request.getParameter("movieName");//get query form the user

                Cart cart = (Cart)session.getAttribute("cart");
                cart.deleteItem(movieName);
                session.setAttribute("cart", cart);

                message.setResult("OK");//prepare for a response 
                message.setRecord(movieName);
                message.setRecordsTotal(1);
            }

            //send back message
            out.println(gson.toJson(message));
        } catch (Exception e) {
            System.out.println("CTR111" + e.getStackTrace() + "");
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
