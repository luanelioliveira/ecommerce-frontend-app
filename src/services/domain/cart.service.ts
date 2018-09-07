import { ProdutoDTO } from './../../models/produto.dto';
import { Cart } from './../../models/cart';
import { StorageService } from './../auth/storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

    constructor(public storage: StorageService){

    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduct(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({quantidade: 1, produto: produto});
        } else {
            console.log('position: ' + position)
            console.log('quantidade: ' + cart.items[position].quantidade)
            cart.items[position].quantidade ++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduct(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            if (cart.items[position].quantidade > 1) {
                cart.items[position].quantidade--;
            } else {
                cart.items.splice(position, 1);
            }
        } 
        this.storage.setCart(cart);
        return cart;
    }

    removeAllProduct(produto: ProdutoDTO) {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    total() : number {
        let cart = this.storage.getCart();
        let sum = 0;
        for (var i = 0; i < cart.items.length; i++) {
            sum += cart.items[i].produto.price * cart.items[i].quantidade;
        }
        return sum;
    }
}