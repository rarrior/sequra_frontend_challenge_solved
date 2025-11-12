import styled from 'styled-components';

export const WidgetContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
`;

export const WidgetHeader = styled.div`
  margin-bottom: 16px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const WidgetTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const WidgetSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

// More info link
export const MoreInfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #2563eb;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  font-family: inherit;

  &:hover {
    color: #1d4ed8;
  }
`;

// Select Styles
export const SelectContainer = styled.div`
  margin-bottom: 16px;
`;

export const SelectLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 40px 12px 12px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  appearance: none;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:hover {
    border-color: #d1d5db;
  }
`;

export const ChevronIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
`;

// Loading State
export const LoadingContainer = styled(WidgetContainer)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LoadingSkeleton = styled.div<{ width?: string; height?: string }>`
  height: ${props => props.height || '16px'};
  width: ${props => props.width || '100%'};
  background-color: #e5e7eb;
  border-radius: 4px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// Error State
export const ErrorContainer = styled.div`
  * {
    box-sizing: border-box;
  }
  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 24px;
`;

export const ErrorContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const ErrorIcon = styled.div`
  color: #dc2626;
  flex-shrink: 0;
  margin-top: 2px;
`;

export const ErrorTitle = styled.h3`
  font-weight: 600;
  color: #7f1d1d;
  margin: 0 0 4px 0;
  font-size: 14px;
`;

export const ErrorMessage = styled.p`
  font-size: 14px;
  color: #991b1b;
  margin: 0;
`;
