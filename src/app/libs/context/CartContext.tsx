import { useToast } from "@/hooks/use-toast";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  url: string
  title: string
  price: GLfloat
  quantity: number
}

const CartContext = createContext<{ Cart: CartItem[]; addToCart: (item: CartItem) => void; totalPrice: number, increaseQuantity: (title: string) => void; decreaseQuantity: (title: string) => void; removeFromCart: (title: string) => void; }>({
  Cart: [],
  addToCart: () => {},
  totalPrice: 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {}, 
  removeFromCart: () => {},
});
export const CartProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {
    const [Cart, setCart] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const { toast } = useToast()

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(Cart));
      }, [Cart, toast]);

      const addToCart = (item: CartItem) => {
        const verifyLogin = localStorage.getItem("role");
        if(!verifyLogin){
          toast({
            title: "Please login to your account",
            variant: "destructive"
          })
        }else{
          const existingItemIndex = Cart.findIndex((cartItem) => cartItem.title === item.title);
          if (existingItemIndex !== -1) {
            toast({
              title: "Item already in cart",
              description: "You cannot add the same item twice to the cart.",
            });
            const updatedCart = [...Cart];
            updatedCart[existingItemIndex].quantity += 1;
            setCart(updatedCart);
          } else {
            setCart([...Cart, { ...item, quantity: 1 }]);
          }
        }
      };

      const calculateTotalPrice = (updatedCart: CartItem[]) => {
        const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
      };

      const increaseQuantity = (title: string) => {
        const updatedCart = Cart.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        calculateTotalPrice(updatedCart);
      };
    
      const decreaseQuantity = (title: string) => {
        const updatedCart = Cart
          .map((item) =>
            item.title === title && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0); // Remove item if quantity becomes 0
        setCart(updatedCart);
        calculateTotalPrice(updatedCart);
      };
    
      const removeFromCart = (title: string) => {
        const updatedCart = Cart.filter((item) => item.title !== title);
        setCart(updatedCart);
        calculateTotalPrice(updatedCart);
      };
    
      useEffect(() => {
        calculateTotalPrice(Cart);
      }, [Cart]);

      return (
        <CartContext.Provider value={{ Cart, addToCart, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart }}>
          {children}
        </CartContext.Provider>
      );
}
export const useCart = () => useContext(CartContext);