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
            cart.items[position].quantidade = cart.items[position].quantidade + 1;
        }
        this.storage.setCart(cart);
        return cart;
    }
}