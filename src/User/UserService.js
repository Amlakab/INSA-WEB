import React, { Component } from 'react';
import axios from 'axios';

export default class UserService extends Component {
    static BASE_URL = "http://localhost:8080";

    static async login(email, password) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, { email, password });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async requestOtp(email) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/request-otp`, { email});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async verifyOtp(email, otp) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/verify-otp`, { email, otp });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async signup(userData) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async register(userData, token) {
        try {
            const response = await axios.post(`${UserService.BASE_URL}/auth/register`, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers(token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id, token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-user/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, userData, token) {
        try {
            const response = await axios.put(`${UserService.BASE_URL}/admin/update/${id}`, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getYourProfile(token) {
        try {
            const response = await axios.get(`${UserService.BASE_URL}/adminuser/get-profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async updateProfile(userData, token) {
        try {
            const response = await axios.put(`${UserService.BASE_URL}/adminuser/update-profile`, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id, token) {
        try {
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === "ADMIN";
    }

    static isUser() {
        const role = localStorage.getItem('role');
        return role === "USER";
    }

    static isOnlyAdmin() {
        return this.isAuthenticated() && this.isAdmin();
    }
}