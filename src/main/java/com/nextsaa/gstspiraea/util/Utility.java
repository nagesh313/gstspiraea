package com.nextsaa.gstspiraea.util;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class Utility {

    public static String generateCommonLangPassword() {
        String upperCaseLetters = RandomStringUtils.random(2, 65, 90, true, true);
        String lowerCaseLetters = RandomStringUtils.random(2, 97, 122, true, true);
        String numbers = RandomStringUtils.randomNumeric(2);
        String specialChar = RandomStringUtils.random(2, 33, 47, false, false);
        String totalChars = RandomStringUtils.randomAlphanumeric(2);
        String combinedChars = upperCaseLetters.concat(lowerCaseLetters)
                .concat(numbers)
                .concat(specialChar)
                .concat(totalChars);
        List<Character> pwdChars = combinedChars.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        Collections.shuffle(pwdChars);
        String password = pwdChars.stream()
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
        return password;
    }

    public static String createOrder(Double amount) throws Exception {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(
                    "rzp_test_4zyGtu09Yf3TwL",
                    "km6IezoWKidIvUHBBsFR8LPs");
            JSONObject orderRequest = new JSONObject();

            Double feeAmountC = amount * 100;
            Double transactionFeesC = 2 * (feeAmountC) / 100;
            orderRequest.put("amount", feeAmountC + transactionFeesC); // amount in the smallest currency unit
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", generatedOrder());
            Order order = razorpayClient.Orders.create(orderRequest);
            return order.toString();

        } catch (RazorpayException e) {
            System.out.println(e.getMessage());
            throw new Exception("Unable to create Razor Pay Order");
        }
    }

    public static String generatedOrder() {
        Date dNow = new Date();
        SimpleDateFormat ft = new SimpleDateFormat("yyMMddhhmmssMs");
        String datetime = ft.format(dNow);
        System.out.println(datetime);
        return "Order-" + datetime;
    }
}
