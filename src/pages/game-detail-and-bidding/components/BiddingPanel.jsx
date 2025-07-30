import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BiddingPanel = ({ 
  isAuction = false,
  currentPrice = 0,
  minimumBid = 0,
  onPlaceBid,
  onBuyNow,
  onMakeOffer,
  isEnded = false
}) => {
  const [customBid, setCustomBid] = useState('');
  const [bidError, setBidError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quickBidAmounts = [1, 2.50, 5, 10];

  const validateBid = (amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      return 'Introduce una cantidad válida';
    }
    if (numAmount < minimumBid) {
      return `La puja mínima es €${minimumBid.toFixed(2)}`;
    }
    if (numAmount <= currentPrice) {
      return `La puja debe ser mayor que €${currentPrice.toFixed(2)}`;
    }
    return '';
  };

  const handleQuickBid = async (increment) => {
    const bidAmount = currentPrice + increment;
    const error = validateBid(bidAmount);
    
    if (error) {
      setBidError(error);
      return;
    }

    setBidError('');
    setIsSubmitting(true);
    
    try {
      await onPlaceBid(bidAmount);
    } catch (err) {
      setBidError('Error al realizar la puja. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCustomBid = async () => {
    const error = validateBid(customBid);
    
    if (error) {
      setBidError(error);
      return;
    }

    setBidError('');
    setIsSubmitting(true);
    
    try {
      await onPlaceBid(parseFloat(customBid));
      setCustomBid('');
    } catch (err) {
      setBidError('Error al realizar la puja. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBuyNow = async () => {
    setIsSubmitting(true);
    try {
      await onBuyNow();
    } catch (err) {
      setBidError('Error al procesar la compra. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakeOffer = async () => {
    setIsSubmitting(true);
    try {
      await onMakeOffer();
    } catch (err) {
      setBidError('Error al enviar la oferta. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEnded) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-body font-semibold text-lg text-foreground mb-2">
            Subasta finalizada
          </h3>
          <p className="font-caption text-sm text-muted-foreground">
            Esta subasta ha terminado
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {isAuction ? (
        <>
          {/* Auction Bidding */}
          <div>
            <h3 className="font-body font-semibold text-lg text-foreground mb-4">
              Realizar puja
            </h3>
            
            {/* Quick Bid Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {quickBidAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => handleQuickBid(amount)}
                  disabled={isSubmitting}
                  className="flex flex-col items-center py-3"
                >
                  <span className="font-data text-sm font-medium">
                    €{(currentPrice + amount).toFixed(2)}
                  </span>
                  <span className="font-caption text-xs text-muted-foreground">
                    +€{amount}
                  </span>
                </Button>
              ))}
            </div>

            {/* Custom Bid Input */}
            <div className="space-y-3">
              <Input
                type="number"
                label="Puja personalizada"
                placeholder={`Mínimo €${minimumBid.toFixed(2)}`}
                value={customBid}
                onChange={(e) => {
                  setCustomBid(e.target.value);
                  setBidError('');
                }}
                error={bidError}
                min={minimumBid}
                step="0.50"
                disabled={isSubmitting}
              />
              
              <Button
                variant="default"
                onClick={handleCustomBid}
                disabled={!customBid || isSubmitting}
                loading={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                iconName="TrendingUp"
                iconPosition="left"
              >
                Pujar €{customBid ? parseFloat(customBid).toFixed(2) : '0.00'}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Fixed Price Options */}
          <div>
            <h3 className="font-body font-semibold text-lg text-foreground mb-4">
              Opciones de compra
            </h3>
            
            <div className="space-y-3">
              <Button
                variant="default"
                onClick={handleBuyNow}
                disabled={isSubmitting}
                loading={isSubmitting}
                className="w-full bg-success hover:bg-success/90 text-success-foreground"
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Comprar ahora - €{currentPrice.toFixed(2)}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleMakeOffer}
                disabled={isSubmitting}
                className="w-full"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Hacer oferta
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Additional Actions */}
      <div className="pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
            iconName="MessageCircle"
            iconPosition="left"
          >
            <span className="hidden sm:inline">Preguntar</span>
            <span className="sm:hidden">Mensaje</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
            iconName="Calculator"
            iconPosition="left"
          >
            <span className="hidden sm:inline">Calcular envío</span>
            <span className="sm:hidden">Envío</span>
          </Button>
        </div>
      </div>

      {/* Bid Information */}
      {isAuction && (
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5 shrink-0" />
            <div className="text-sm font-caption text-muted-foreground">
              <p className="mb-1">
                • Las pujas son vinculantes y no se pueden cancelar
              </p>
              <p className="mb-1">
                • El incremento mínimo es de €0.50
              </p>
              <p>
                • El ganador será contactado al finalizar la subasta
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingPanel;