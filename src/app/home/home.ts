import { Component, AfterViewInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  category: 'masculin' | 'feminin' | 'oriental' | 'mixte';
  tag?: string;
  tagClass?: string;
  rating: number;
  sub: string;
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
  // Catégories disponibles
  categories = ['all', 'masculin', 'feminin', 'oriental', 'mixte'];
  selectedCategory = 'all';

  // Liste complète des 28 produits
  products: Product[] = [
    { id: '1', name: 'Suave The Parfum', price: 28000, img: 'assets/products/suave-parfum.jpeg', category: 'masculin', tag: 'Best-seller', tagClass: 'bestseller', rating: 5, sub: 'Masculin · Bois · Aquatique · 100ml' },
    { id: '2', name: 'Lush Cherry', price: 32000, img: 'assets/products/lush-cherry.jpeg', category: 'feminin', tag: 'Nouveau', tagClass: 'nouveau', rating: 5, sub: 'Féminin · Fruité · Cerise · 100ml' },
    { id: '3', name: 'Midnight Oud', price: 35000, img: 'assets/products/midnight-oud.jpeg', category: 'oriental', tag: 'Oriental', tagClass: 'oriental', rating: 5, sub: 'Oriental · Oud · Épices · 100ml' },
    { id: '4', name: 'Soleil d\'Ombre', price: 30000, img: 'assets/products/soleil-dombre.jpeg', category: 'masculin', rating: 4, sub: 'Masculin · Boisé · Jacques Yves · 100ml' },
    { id: '5', name: 'Exchange Unlimited', price: 22000, img: 'assets/products/exchange-unlimited.jpeg', category: 'masculin', rating: 4, sub: 'Masculin · Frais · Boisé · 100ml' },
    { id: '6', name: 'D\'Hommes Intense', price: 27000, img: 'assets/products/dhommes-intense.jpeg', category: 'masculin', tag: 'Intense', tagClass: 'intense', rating: 5, sub: 'Masculin · Ambré · Cuiré · 100ml' },
    { id: '7', name: 'Hunted Azzure', price: 25000, img: 'assets/products/hunted-azzure.jpeg', category: 'masculin', rating: 4, sub: 'Masculin · Aromatique · Épicé · 100ml' },
    { id: '8', name: 'Deux Cent Douze Men', price: 26000, img: 'assets/products/deux-cent-douze-men.jpeg', category: 'masculin', rating: 5, sub: 'Masculin · Frais · Agrumes · 100ml' },
    { id: '9', name: 'Genuine Man Reserve', price: 33000, img: 'assets/products/genuine-man-reserve.jpeg', category: 'masculin', tag: 'Premium', tagClass: 'bestseller', rating: 5, sub: 'Masculin · Boisé · Cuir · 100ml' },
    { id: '10', name: 'L\'Infinité Jacques Yves', price: 31000, img: 'assets/products/linfinite-jacques-yves.jpeg', category: 'masculin', rating: 4, sub: 'Masculin · Boisé · Musqué · 100ml' },
    { id: '11', name: 'Cocktail Intense', price: 29000, img: 'assets/products/cocktail-intense.jpeg', category: 'oriental', tag: 'Intense', tagClass: 'intense', rating: 5, sub: 'Oriental · Ambré · Épicé · 100ml' },
    { id: '12', name: 'Vanille en Tobacco', price: 28000, img: 'assets/products/vanille-en-tobacco.jpeg', category: 'mixte', tag: 'Nouveau', tagClass: 'nouveau', rating: 5, sub: 'Mixte · Gourmand · Boisé · 80ml' },
    { id: '13', name: 'My Soulmate', price: 26000, img: 'assets/products/my-soulmate.jpeg', category: 'feminin', tag: 'Féminin', tagClass: 'feminin', rating: 4, sub: 'Féminin · Floral · Ambré · 100ml' },
    { id: '14', name: 'Ophylia Legend', price: 30000, img: 'assets/products/ophylia-legend.jpeg', category: 'feminin', tag: 'Best-seller', tagClass: 'bestseller', rating: 5, sub: 'Féminin · Floral · Rose · 80ml' },
    { id: '15', name: 'Night Oud + Deo', price: 34000, img: 'assets/products/night-oud-set.jpeg', category: 'oriental', tag: 'Coffret', tagClass: 'oriental', rating: 5, sub: 'Coffret · Oud · Déo offert · 80ml' },
    { id: '16', name: 'Suave Elixir', price: 29000, img: 'assets/products/suave-elixir.jpeg', category: 'masculin', tag: 'Extrait', tagClass: 'intense', rating: 5, sub: 'Masculin · Extrait · Marin · 80ml' },
    { id: '17', name: 'Idéal for Woman', price: 27000, img: 'assets/products/ideal-for-woman.jpeg', category: 'feminin', tag: 'Féminin', tagClass: 'feminin', rating: 4, sub: 'Féminin · Floral · Poudré · 100ml' },
    { id: '18', name: 'Night Oud', price: 25000, img: 'assets/products/night-oud.jpeg', category: 'oriental', tag: 'Oriental', tagClass: 'oriental', rating: 5, sub: 'Oriental · Oud · Musqué · 80ml' },
    { id: '19', name: 'Barcode Signature', price: 23000, img: 'assets/products/barcode-signature.jpeg', category: 'mixte', rating: 4, sub: 'Mixte · Frais · Boisé · 100ml' },
    { id: '20', name: 'Scandant John Gustav', price: 36000, img: 'assets/products/scandant-john-gustav.jpeg', category: 'masculin', tag: 'Premium', tagClass: 'bestseller', rating: 5, sub: 'Masculin · Intense · Épicé · 100ml' },
    { id: '21', name: 'Zara Man', price: 24000, img: 'assets/products/zara-man.jpeg', category: 'masculin', rating: 4, sub: 'Masculin · Boisé · Élégant · 100ml' },
    { id: '22', name: 'Qissa Delicious', price: 31000, img: 'assets/products/qissa-delicious.jpeg', category: 'feminin', tag: 'Féminin', tagClass: 'feminin', rating: 5, sub: 'Féminin · Floral · Rosé · 100ml' },
    { id: '23', name: 'Qissa Pink', price: 29000, img: 'assets/products/qissa-pink.jpeg', category: 'feminin', tag: 'Nouveau', tagClass: 'nouveau', rating: 5, sub: 'Féminin · Fruité · Floral · 100ml' },
    { id: '24', name: 'Qissa Blue', price: 27000, img: 'assets/products/qissa-blue.jpeg', category: 'mixte', rating: 4, sub: 'Mixte · Frais · Boisé · 100ml' },
    { id: '25', name: 'Marina Taskeen', price: 28000, img: 'assets/products/marina-taskeen.jpeg', category: 'feminin', tag: 'Féminin', tagClass: 'feminin', rating: 5, sub: 'Féminin · Oriental · Soleil · 100ml' },
    { id: '26', name: 'Taskeen', price: 26000, img: 'assets/products/taskeen.jpeg', category: 'feminin', rating: 4, sub: 'Féminin · Floral · Pêche · 100ml' },
    { id: '27', name: 'Caramel Cascade', price: 27000, img: 'assets/products/caramel-cascade.jpeg', category: 'feminin', tag: 'Gourmand', tagClass: 'feminin', rating: 5, sub: 'Féminin · Gourmand · Caramel · 100ml' },
    { id: '28', name: 'Collection Exclusif', price: 32000, img: 'assets/products/hero-banner.jpeg', category: 'oriental', tag: 'Exclusif', tagClass: 'bestseller', rating: 5, sub: 'Oriental · Oud · Épicé · 100ml' }
  ];

  // Panier
  cart: CartItem[] = [];
  cartPanelOpen = false;
  cartCount = 0;
  cartTotal = 0;

  // Curseur et animations
  private cursorElement!: HTMLElement;
  private ringElement!: HTMLElement;
  private observer!: IntersectionObserver;
  private mouseMoveListener!: () => void;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.initCustomCursor();
    this.initScrollReveal();
    this.initHeaderScroll();
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
    if (this.mouseMoveListener) document.removeEventListener('mousemove', this.mouseMoveListener);
  }

  private initCustomCursor(): void {
    this.cursorElement = this.el.nativeElement.querySelector('#cursor');
    this.ringElement = this.el.nativeElement.querySelector('#cursorRing');
    if (!this.cursorElement || !this.ringElement) return;

    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e: MouseEvent) => {
      this.renderer.setStyle(this.cursorElement, 'left', e.clientX + 'px');
      this.renderer.setStyle(this.cursorElement, 'top', e.clientY + 'px');
      this.renderer.setStyle(this.ringElement, 'left', e.clientX + 'px');
      this.renderer.setStyle(this.ringElement, 'top', e.clientY + 'px');
    });

    const hoverElements = this.el.nativeElement.querySelectorAll('a, button, .product-card, .cat-card');
    hoverElements.forEach((el: HTMLElement) => {
      this.renderer.listen(el, 'mouseenter', () => {
        this.renderer.setStyle(this.cursorElement, 'width', '17px');
        this.renderer.setStyle(this.cursorElement, 'height', '17px');
        this.renderer.setStyle(this.ringElement, 'width', '50px');
        this.renderer.setStyle(this.ringElement, 'height', '50px');
      });
      this.renderer.listen(el, 'mouseleave', () => {
        this.renderer.setStyle(this.cursorElement, 'width', '9px');
        this.renderer.setStyle(this.cursorElement, 'height', '9px');
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
    }, { threshold: 0.08 });
    const elements = this.el.nativeElement.querySelectorAll('.fade-up');
    elements.forEach((el: Element) => this.observer.observe(el));
  }

  private initHeaderScroll(): void {
    const header = this.el.nativeElement.querySelector('#mainHeader');
    if (!header) return;
    this.renderer.listen('window', 'scroll', () => {
      if (window.scrollY > 50) {
        this.renderer.setStyle(header, 'boxShadow', '0 3px 18px rgba(92,45,45,.1)');
      } else {
        this.renderer.setStyle(header, 'boxShadow', 'none');
      }
    });
  }

  // Getter pour les produits filtrés
  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'all') return this.products;
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  // Filtrage
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
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
    this.openCart();
  }

  updateQuantity(productId: string, change: number): void {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter(i => i.id !== productId);
    }
    this.updateCartSummary();
  }

  removeFromCart(productId: string): void {
    this.cart = this.cart.filter(i => i.id !== productId);
    this.updateCartSummary();
  }

  private updateCartSummary(): void {
    this.cartCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);
    this.cartTotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  openCart(): void {
    this.cartPanelOpen = true;
  }

  closeCart(): void {
    this.cartPanelOpen = false;
  }

  // Génération du message WhatsApp
  checkout(): void {
    if (this.cart.length === 0) {
      alert('Votre panier est vide.');
      return;
    }
    const lines = this.cart.map(item => 
      `${item.quantity}x ${item.name} (${(item.price * item.quantity).toLocaleString('fr-FR')} FCFA)`
    ).join('%0A');
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const msg = `Bonjour AM Fragrance 👋, je souhaite commander :%0A${lines}%0A%0ATotal : ${total.toLocaleString('fr-FR')} FCFA`;
    window.open(`https://wa.me/221781636937?text=${msg}`, '_blank');
  }

  // Helper pour les étoiles
  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}