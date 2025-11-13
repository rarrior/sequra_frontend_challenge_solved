import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

import { 
  ModalOverlay, ModalContent, CloseButton, ModalHeader, ModalTitle, 
  BrandName, ModalBody, ModalButton, InfoCard, InfoCardTitle, 
  InfoCardText, DisclaimerBox, DisclaimerText
 } from './InstallmentModal.styled';

import type { InstallmentModalProps } from '../types';


export const InstallmentModal: React.FC<InstallmentModalProps> = ({ isOpen, onClose, selectedOption }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !selectedOption) return null;

  return (
    <ModalOverlay role="dialog" onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label={t('modal.close')}>
          <X size={24} />
        </CloseButton>

        <ModalHeader>
          <BrandName>seQura</BrandName>
          <ModalTitle>{t('modal.title')}</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <InfoCard $variant="blue">
            <InfoCardTitle $variant="blue">
              {t('modal.benefit1')}
            </InfoCardTitle>
            <InfoCardText $variant="blue">
              <strong>{selectedOption.instalment_fee.string}</strong>
            </InfoCardText>
          </InfoCard>

          <InfoCard $variant="green">
            <InfoCardTitle $variant="green">
              {t('modal.benefit2')}
            </InfoCardTitle>
            <InfoCardText $variant="green">
              <strong>{selectedOption.instalment_total.string}</strong>
            </InfoCardText>
          </InfoCard>

          <InfoCard $variant="purple">
            <InfoCardTitle $variant="purple">
              {t('modal.benefit3')}
            </InfoCardTitle>
            <InfoCardText $variant="purple">
              <strong>{selectedOption.instalment_total.string}</strong>
            </InfoCardText>
          </InfoCard>

          <DisclaimerBox>
            <DisclaimerText>
              {t('modal.disclaimer', { fee: selectedOption.instalment_fee.string })}
            </DisclaimerText>
          </DisclaimerBox>
        </ModalBody>

        <ModalButton onClick={onClose}>{t('modal.understood')}</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};