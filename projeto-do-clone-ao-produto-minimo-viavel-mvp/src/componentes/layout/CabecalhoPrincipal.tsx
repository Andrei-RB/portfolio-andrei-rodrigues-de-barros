import { useAuthStore } from '../../estado/authStore';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, User, Sun, Moon, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function CabecalhoPrincipal() {
  const { user, login, logout, loading } = useAuthStore();
  const [temaEscuro, setTemaEscuro] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (temaEscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [temaEscuro]);

  const alternarTema = () => setTemaEscuro(!temaEscuro);

  return (
    <header className="glass-card sticky top-0 z-50 border-b-0">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/30">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-gradient">
            DREI QR
          </h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={alternarTema}
            className="rounded-full hover:bg-primary/10 transition-colors"
          >
            <AnimatePresence mode="wait">
              {temaEscuro ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Moon className="h-5 w-5 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Sun className="h-5 w-5 text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <div className="h-8 w-[1px] bg-border mx-2" />

          {loading ? (
            <div className="h-10 w-10 animate-pulse bg-muted rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-muted/50 rounded-full border border-border/50"
              >
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'Usuário'} 
                    className="h-8 w-8 rounded-full border-2 border-primary/20"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                )}
                <span className="hidden sm:inline font-medium text-sm">{user.displayName}</span>
              </motion.div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout} 
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              onClick={login} 
              className="btn-dopamine text-white font-bold px-6 rounded-full"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
