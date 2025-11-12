import React, { useEffect } from 'react';

import { X } from 'lucide-react';

import { 
  ModalOverlay, ModalContent, CloseButton, ModalHeader, ModalTitle, 
  BrandName, ModalBody, ModalButton, InfoCard, InfoCardTitle, 
  InfoCardText, DisclaimerBox, DisclaimerText
 } from './InstallmentModal.styled';

import type { InstallmentModalProps } from '../types';


export const InstallmentModal: React.FC<InstallmentModalProps> = ({ isOpen, onClose, selectedOption }) => {
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
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Cerrar">
          <X size={24} />
        </CloseButton>

        <ModalHeader>
          <BrandName>seQura</BrandName>
          <ModalTitle>Fracciona tu pago</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <InfoCard $variant="blue">
            <InfoCardTitle $variant="blue">
              ✓ Fracciona tu pago solo con un coste fijo por cuota
            </InfoCardTitle>
            <InfoCardText $variant="blue">
              <strong>{selectedOption.instalment_fee.string}</strong>
            </InfoCardText>
          </InfoCard>

          <InfoCard $variant="green">
            <InfoCardTitle $variant="green">
              ✓ Ahora solo pagas la primera cuota
            </InfoCardTitle>
            <InfoCardText $variant="green">
              <strong>{selectedOption.instalment_total.string}</strong>
            </InfoCardText>
          </InfoCard>

          <InfoCard $variant="purple">
            <InfoCardTitle $variant="purple">
              ✓ El resto de pagos se cargarán automáticamente a tu tarjeta
            </InfoCardTitle>
            <InfoCardText $variant="purple">
              <strong>{selectedOption.instalment_total.string}</strong>
            </InfoCardText>
          </InfoCard>

          <DisclaimerBox>
            <DisclaimerText>
              Además en el importe mostrado ya se incluye la cuota única mensual de {selectedOption.instalment_fee.string}, por lo que no tendrás ninguna sorpresa.
            </DisclaimerText>
          </DisclaimerBox>
        </ModalBody>

        <ModalButton onClick={onClose}>Entendido</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};