import { Component, AfterViewInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  tag: string;
  rating: number;
  img: string;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-am-fragrance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  // Produits mockés (parfums)
  products: Product[] = [
    {
      id: 1,
      name: 'Bois d\'Argent',
      desc: 'Iris · Ambre · Cèdre',
      price: 165,
      tag: 'Best-seller',
      rating: 5,
      img: 'https://picsum.photos/400/500?random=10'
    },
    {
      id: 2,
      name: 'Fleur d\'Oranger',
      desc: 'Néroli · Petitgrain · Musc',
      price: 140,
      tag: 'Nouveau',
      rating: 4,
      img: 'https://picsum.photos/400/500?random=11'
    },
    {
      id: 3,
      name: 'Oud Épicé',
      desc: 'Oud · Safran · Vanille',
      price: 220,
      tag: '',
      rating: 5,
      img: 'https://picsum.photos/400/500?random=12'
    },
    {
      id: 4,
      name: 'Vétiver Sauvage',
      desc: 'Vétiver · Pamplemousse · Cuir',
      price: 175,
      tag: '',
      rating: 5,
      img: 'https://picsum.photos/400/500?random=13'
    }
  ];

  cart: CartItem[] = [];
  cartPanelOpen = false;
  cartCount = 0;
  cartTotal = 0;

  private cursorElement!: HTMLElement;
  private ringElement!: HTMLElement;
  private observer!: IntersectionObserver;
  private mouseMoveListener!: () => void;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.initCustomCursor();
    this.initScrollReveal();
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
    if (this.mouseMoveListener) document.removeEventListener('mousemove', this.mouseMoveListener);
  }

  private initCustomCursor(): void {
    this.cursorElement = this.el.nativeElement.querySelector('#cursor');
    this.ringElement = this.el.nativeElement.querySelector('#cursorRing');

    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      this.renderer.setStyle(this.cursorElement, 'left', e.clientX + 'px');
      this.renderer.setStyle(this.cursorElement, 'top', e.clientY + 'px');
      this.renderer.setStyle(this.ringElement, 'left', e.clientX + 'px');
      this.renderer.setStyle(this.ringElement, 'top', e.clientY + 'px');
    });

    const hoverElements = this.el.nativeElement.querySelectorAll('a, button, .product-card, .cat-card');
    hoverElements.forEach((el: HTMLElement) => {
      this.renderer.listen(el, 'mouseenter', () => {
        this.renderer.setStyle(this.cursorElement, 'width', '20px');
        this.renderer.setStyle(this.cursorElement, 'height', '20px');
        this.renderer.setStyle(this.ringElement, 'width', '50px');
        this.renderer.setStyle(this.ringElement, 'height', '50px');
      });
      this.renderer.listen(el, 'mouseleave', () => {
        this.renderer.setStyle(this.cursorElement, 'width', '10px');
        this.renderer.setStyle(this.cursorElement, 'height', '10px');
        this.renderer.setStyle(this.ringElement, 'width', '36px');
        this.renderer.setStyle(this.ringElement, 'height', '36px');
      });
    });
  }

  private initScrollReveal(): void {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = this.el.nativeElement.querySelectorAll('.fade-up');
    elements.forEach((el: Element) => this.observer.observe(el));
  }

  // Gestion du panier
  addToCart(product: Product): void {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.updateCartSummary();
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCartSummary();
  }

  updateQuantity(productId: number, change: number): void {
    const item = this.cart.find(i => i.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.updateCartSummary();
      }
    }
  }

  private updateCartSummary(): void {
    this.cartCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.cartTotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  toggleCart(open: boolean): void {
    this.cartPanelOpen = open;
  }

  // Helper pour générer les étoiles
  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}