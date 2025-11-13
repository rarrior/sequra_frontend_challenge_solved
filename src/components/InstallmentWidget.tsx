
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { InstallmentModal } from './InstallmentModal';
import { CreditAgreementService } from '../services/CreditAgreementService';
import { EventsService } from '../services/EventsService';
import { Info, ChevronDown, AlertCircle } from 'lucide-react'

import { 
  WidgetContainer, WidgetHeader, SelectContainer, SelectLabel, SelectWrapper,
  StyledSelect, ChevronIcon, LoadingContainer, LoadingSkeleton,
  ErrorContainer, ErrorContent, ErrorIcon, ErrorTitle, ErrorMessage, 
  HeaderRow, WidgetTitle, WidgetSubtitle, MoreInfoButton
} from './InstallmentWidget.styled';

import type { InstallmentWidgetProps, InstallmentOption } from '../types';

const InstallmentWidget: React.FC<InstallmentWidgetProps> = ({
  apiBaseUrl,
  priceSelector,
  onLoad,
  onError,
}) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number>(0);
  const [installments, setInstallments] = useState<InstallmentOption[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const creditService = useRef(new CreditAgreementService(apiBaseUrl));
  const eventsService = useRef(new EventsService(apiBaseUrl));
  const observerRef = useRef<MutationObserver | null>(null);

  const trackEvent = useCallback((type: string, additionalData: any = {}) => {
    eventsService.current.trackEvent({
      context: 'checkoutWidget',
      type,
      ...additionalData,
    });
  }, []);

  const fetchInstallments = useCallback(async (priceInCents: number) => {
    if (priceInCents <= 0) {
      console.warn('⚠️ Invalid price for fetching installments:', priceInCents);
      const error = new Error(t('widget.invalidPrice'));
      setError(error.message);
      onError?.(error);
      trackEvent('widgetError', { error: error.message });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await creditService.current.fetchInstallments(priceInCents);
      setInstallments(data);
      
      if (data.length > 0) {
        setSelectedIndex(0);
      }
      
      onLoad?.();
      trackEvent('widgetLoaded', { price: priceInCents });
    } catch (err) {
      const error = err as Error;
      setError(t('widget.loadError'));
      onError?.(error);
      trackEvent('widgetError', { error: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [onLoad, onError, trackEvent, t]);

  const parsePriceFromElement = useCallback((element: Element): number => {
    const text = element.textContent || '';
    const cleanText = text.replace(/[€$\s]/g, '').replace(',', '.');
    const priceValue = parseFloat(cleanText);

    if (isNaN(priceValue) || priceValue <= 0) {
      console.warn('⚠️ Invalid price:', priceValue);
      const error = new Error(t('widget.invalidPrice'));
      setError(error.message);
      setIsLoading(false);
      onError?.(error);
      trackEvent('widgetError', { error: error.message });
      return 0;
    }
    return Math.round(priceValue * 100);
  }, [t, onError, trackEvent]);

  useEffect(() => {
    if (!priceSelector) {
      console.warn(`Price selector "${priceSelector}" not found`);
      return;
    }

    const priceElement = document.querySelector(priceSelector);
    if (!priceElement) {
      console.warn(`Price selector "${priceSelector}" not found`);
      return;
    }

    const initialPriceValue = parsePriceFromElement(priceElement);
    setPrice(initialPriceValue);

    observerRef.current = new MutationObserver(() => {
      const newPrice = parsePriceFromElement(priceElement);
      if (newPrice !== price && newPrice > 0) {
        setPrice(newPrice);
        trackEvent('priceChanged', { newPrice });
      }
    });

    observerRef.current.observe(priceElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priceSelector, parsePriceFromElement, trackEvent, price]);

  useEffect(() => {
    if (price > 0) {
      fetchInstallments(price);
    }
  }, [price, fetchInstallments]);

  const handleSelectInstallment = (index: number) => {
    setSelectedIndex(index);
    trackEvent('simulatorInstalmentChanged', {
      selectedInstalment: installments[index]?.instalment_count,
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    trackEvent('modalOpened', {
      selectedInstalment: installments[selectedIndex]?.instalment_count,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    trackEvent('modalClosed');
  };

  if (isLoading) {
    return (
      <LoadingContainer role="status">
        <LoadingSkeleton height="16px" width="75%" />
        <LoadingSkeleton height="40px" />
        <LoadingSkeleton height="80px" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorContent>
          <ErrorIcon>
            <AlertCircle size={20} />
          </ErrorIcon>
          <div>
            <ErrorTitle>{t('widget.errorTitle')}</ErrorTitle>
            <ErrorMessage>{error}</ErrorMessage>
          </div>
        </ErrorContent>
      </ErrorContainer>
    );
  }

  if (installments.length === 0) {
    return null;
  }

  const selectedOption = installments[selectedIndex];

  return (
    <>
      <WidgetContainer>
        <WidgetHeader>
          <HeaderRow>
            <WidgetTitle>{t('widget.title')}</WidgetTitle>
            <MoreInfoButton onClick={handleOpenModal}>
              <Info size={16} />
              {t('widget.moreInfo')}
            </MoreInfoButton>
          </HeaderRow>
          <WidgetSubtitle>{t('widget.subtitle')}</WidgetSubtitle>
        </WidgetHeader>

        <SelectContainer>
          <SelectLabel htmlFor="sequra-installment-select">
            {t('widget.selectInstallments')}
          </SelectLabel>
          <SelectWrapper>
            <StyledSelect
              id="sequra-installment-select"
              value={selectedIndex}
              onChange={(e) => handleSelectInstallment(Number(e.target.value))}
            >
              {installments.map((option, index) => (
                <option key={option.instalment_count} value={index}>
                  {option.instalment_count} {t('widget.installmentsOf')} {option.instalment_total.string}
                </option>
              ))}
            </StyledSelect>
            <ChevronIcon>
              <ChevronDown size={20} />
            </ChevronIcon>
          </SelectWrapper>
        </SelectContainer>
      </WidgetContainer>

      <InstallmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedOption={selectedOption}
      />
    </>
  );
};

export default InstallmentWidget;