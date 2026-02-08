import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  styled,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  LocalShipping,
  Inventory,
  AssignmentTurnedIn,
  LocalShippingOutlined,
  TaskAlt,
} from "@mui/icons-material";

// Order Status Enum
export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
  REFUNDED = "REFUNDED",
}

// Define the steps in order
const ORDER_STEPS = [
  {
    key: OrderStatus.CONFIRMED,
    label: "Order Confirmed",
    icon: AssignmentTurnedIn,
  },
  {
    key: OrderStatus.PROCESSING,
    label: "Processing",
    icon: Inventory,
  },
  {
    key: OrderStatus.SHIPPED,
    label: "Shipped",
    icon: LocalShipping,
  },
  {
    key: OrderStatus.OUT_FOR_DELIVERY,
    label: "Out for Delivery",
    icon: LocalShippingOutlined,
  },
  {
    key: OrderStatus.DELIVERED,
    label: "Delivered",
    icon: TaskAlt,
  },
];

// Custom connector styling
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#000000",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#000000",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#E5E5E5",
    borderRadius: 1,
  },
}));

// Custom step icon
interface StepIconProps {
  active: boolean;
  completed: boolean;
  icon: React.ComponentType<{ sx?: any }>;
}

const CustomStepIcon: React.FC<StepIconProps> = ({
  active,
  completed,
  icon: Icon,
}) => {
  return (
    <Box
      sx={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: completed ? "#000000" : active ? "#333333" : "#E5E5E5",
        color: completed || active ? "white" : "#9E9E9E",
        border: active ? "3px solid" : "none",
        borderColor: active ? "#000000" : "transparent",
        transition: "all 0.3s ease",
      }}
    >
      {completed ? (
        <CheckCircle sx={{ fontSize: 30 }} />
      ) : (
        <Icon sx={{ fontSize: 28 }} />
      )}
    </Box>
  );
};

interface OrderStepperProps {
  currentStatus: OrderStatus | string;
}

const OrderStepperMUI: React.FC<OrderStepperProps> = ({ currentStatus }) => {
  // Get the active step index based on current status
  const getActiveStep = (status: OrderStatus | string): number => {
    // Handle special cases
    if (status === OrderStatus.PAID || status === OrderStatus.PENDING) {
      return 0; // Before first step
    }

    const stepIndex = ORDER_STEPS.findIndex((step) => step.key === status);
    return stepIndex !== -1 ? stepIndex : 0;
  };

  const activeStep = getActiveStep(currentStatus as OrderStatus);
  const isCancelled = [
    OrderStatus.CANCELLED,
    OrderStatus.REFUNDED,
    OrderStatus.RETURNED,
  ].includes(currentStatus as OrderStatus);

  // If order is cancelled, show alert instead of stepper
  if (isCancelled) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography variant="h6" component="span">
          Order {currentStatus.toLowerCase()}
        </Typography>
      </Alert>
    );
  }

  return (
    <Box sx={{ width: "100%", py: 3 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
      >
        {ORDER_STEPS.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <Step key={step.key} completed={isCompleted}>
              <StepLabel
                StepIconComponent={() => (
                  <CustomStepIcon
                    active={isActive}
                    completed={isCompleted}
                    icon={step.icon}
                  />
                )}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isCompleted || isActive ? 600 : 400,
                    color:
                      isCompleted || isActive
                        ? "text.primary"
                        : "text.secondary",
                    mt: 1,
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default OrderStepperMUI;
