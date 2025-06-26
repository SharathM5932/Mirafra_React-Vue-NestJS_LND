  import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
  import { MessagePattern, Payload } from '@nestjs/microservices';
  import { CartService } from './cart.service';
  import { AddCartDto } from '../dto/add-cart.dto';

  @Controller('cart') // HTTP prefix
  export class CartController {
    constructor(private readonly cartService: CartService) {}

    // ---- TCP HANDLERS ----
    @MessagePattern('add_cart')
    addCartTCP(@Payload() data: AddCartDto) {
      return this.cartService.addToCart(data);
    }

    @MessagePattern('get_cart')
    getCartTCP(@Payload() uid: string) {
      return this.cartService.getCart(uid);
    }

    @MessagePattern('inc_cart')
    incTCP(@Payload() cid: string) {
      return this.cartService.increment(cid);
    }

    @MessagePattern('dec_cart')
    decTCP(@Payload() cid: string) {
      return this.cartService.decrement(cid);
    }

    @MessagePattern('del_cart')
    delTCP(@Payload() cid: string) {
      return this.cartService.deleteItem(cid);
    }

    // ---- HTTP HANDLERS ----
    @Post()
    addCartHTTP(@Body() data: AddCartDto) {
      return this.cartService.addToCart(data);
    }

    @Get(':uid')
    getCartHTTP(@Param('uid') uid: string) {
      return this.cartService.getCart(uid);
    }

    @Patch('inc/:cid')
    incHTTP(@Param('cid') cid: string) {
      return this.cartService.increment(cid);
    }

    @Patch('dec/:cid')
    decHTTP(@Param('cid') cid: string) {
      return this.cartService.decrement(cid);
    }

    @Delete(':cid')
    delHTTP(@Param('cid') cid: string) {
      return this.cartService.deleteItem(cid);
    }
  }
