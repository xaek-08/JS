import api from './axios.js'


export const cartAPI={
    getCart: async() => {
        try{
            const response = await api.get('/cart');
            return response.data
        } catch(error){
            console.error('Error fetching cart:',error)
            throw error
        }
    },

    addItem: async(menuItemId,quantity,price,branch_id) => {
        try{
            const response = await api.post('/cart/items',{
                menuItemId,
                quantity,
                price,
                branch_id
            })
            return response.data
        }
        catch(error){
            console.error('Error adding items',error)
            console.error('Error response:', error.response?.data)
            throw error
        }
    },

    updateItem: async (cartItemId, quantity) => {
        try{
            const response = await api.put(`/cart/items/${cartItemId}`,{quantity})
            return response.data
        }
        catch(error){
            console.error('Error updating items',error)
            throw error
        }
    },

    removeItem: async (cartItemId) => {
        try{
            const response = await api.delete(`/cart/items/${cartItemId}`)
            return response.data
        }catch(error){
            console.error('Error removing items',error)
            throw error
        }
    },

    clearCart: async() => {
        try{
            const response =await api.delete('/cart')
            return response
        } catch(error){
            console.error('Error deleting cart',error)
            throw error
        }
    }
}