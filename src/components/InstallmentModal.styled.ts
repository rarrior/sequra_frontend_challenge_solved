import styled from 'styled-components';

export const BrandName = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 448px;
  width: 100%;
  padding: 24px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  transition: color 0.2s;

  &:hover {
    color: #4b5563;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
`;

export const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoCard = styled.div<{ $variant: 'blue' | 'green' | 'purple' }>`
  display: flex;  
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  gap: 15px;

  padding: 16px;
  border-radius: 8px;
  
  ${props => {
    switch (props.$variant) {
      case 'blue':
        return `
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
        `;
      case 'green':
        return `
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
        `;
      case 'purple':
        return `
          background-color: #faf5ff;
          border: 1px solid #e9d5ff;
        `;
    }
  }}
`;

export const InfoCardTitle = styled.h3<{ $variant: 'blue' | 'green' | 'purple' }>`
  flex: 1;

  font-weight: 500;
  margin: 0 0 8px 0;
  
  ${props => {
    switch (props.$variant) {
      case 'blue':
        return `color: #1e3a8a;`;
      case 'green':
        return `color: #14532d;`;
      case 'purple':
        return `color: #581c87;`;
    }
  }}
`;

export const InfoCardText = styled.p<{ $variant: 'blue' | 'green' | 'purple' }>`
  flex: 0 0 auto; 
  white-space: nowrap;
  
  font-size: 20px;
  margin: 0;
  text-align: right;
  
  ${props => {
    switch (props.$variant) {
      case 'blue':
        return `color: #1e40af;`;
      case 'green':
        return `color: #15803d;`;
      case 'purple':
        return `color: #7c3aed;`;
    }
  }}
`;

export const DetailSection = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-top: 16px;
`;

export const DetailRow = styled.div<{ $total?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  ${props => props.$total && `
    font-size: 16px;
    font-weight: 700;
    border-top: 1px solid #e5e7eb;
    padding-top: 8px;
  `}
`;

export const DetailLabel = styled.span<{ $total?: boolean }>`
  font-size: ${props => props.$total ? '16px' : '14px'};
  color: ${props => props.$total ? '#111827' : '#6b7280'};
`;

export const DetailValue = styled.span<{ $total?: boolean }>`
  font-size: ${props => props.$total ? '16px' : '14px'};
  font-weight: ${props => props.$total ? '700' : '600'};
  color: #111827;
`;

export const DisclaimerBox = styled.div`
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  color: #6b7280;
`;

export const DisclaimerText = styled.p`
  margin: 0 0 4px 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModalButton = styled.button`
  width: 100%;
  margin-top: 24px;
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
  font-family: inherit;

  &:hover {
    background-color: #1d4ed8;
  }
`;





