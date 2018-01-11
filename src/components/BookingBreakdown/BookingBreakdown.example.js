import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  LINE_ITEM_DAY,
  LINE_ITEM_NIGHT,
  TX_TRANSITION_ACCEPT,
  TX_TRANSITION_ACTOR_CUSTOMER,
  TX_TRANSITION_AUTO_DECLINE,
  TX_TRANSITION_CANCEL,
  TX_TRANSITION_DECLINE,
  TX_TRANSITION_MARK_DELIVERED,
  TX_TRANSITION_PREAUTHORIZE,
} from '../../util/types';
import config from '../../config';
import BookingBreakdown from './BookingBreakdown';

const { UUID, Money } = sdkTypes;

const CURRENCY = config.currency;

const exampleBooking = attributes => {
  return {
    id: new UUID('example-booking'),
    type: 'booking',
    attributes,
  };
};

const exampleTransaction = params => {
  const created = new Date(Date.UTC(2017, 1, 1));
  return {
    id: new UUID('example-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: created,
      lastTransitionedAt: created,
      lastTransition: TX_TRANSITION_PREAUTHORIZE,
      transitions: [
        {
          at: created,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TX_TRANSITION_PREAUTHORIZE,
        },
      ],

      // payinTotal, payoutTotal, and lineItems required in params
      ...params,
    },
  };
};

export const Checkout = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const CustomerOrder = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const ProviderSale = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(7000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const ProviderSaleZeroCommission = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(0, CURRENCY),
          lineTotal: new Money(0, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};

export const ProviderSaleSingleNight = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSalePreauthorized = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      lastTransition: TX_TRANSITION_PREAUTHORIZE,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleAccepted = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      lastTransition: TX_TRANSITION_ACCEPT,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleDeclined = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      lastTransition: TX_TRANSITION_DECLINE,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleAutoDeclined = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      lastTransition: TX_TRANSITION_AUTO_DECLINE,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleDelivered = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      lastTransition: TX_TRANSITION_MARK_DELIVERED,
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(2500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const ProviderSaleCanceled = {
  component: BookingBreakdown,
  props: {
    userRole: 'provider',
    unitType: LINE_ITEM_NIGHT,
    transaction: exampleTransaction({
      lastTransition: TX_TRANSITION_CANCEL,
      payinTotal: new Money(0, CURRENCY),
      payoutTotal: new Money(0, CURRENCY),
      lineItems: [
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/night',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(-1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(-4500, CURRENCY),
          reversal: true,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(-2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: false,
        },
        {
          code: 'line-item/provider-commission',
          includeFor: ['provider'],
          quantity: new Decimal(-1),
          unitPrice: new Money(2000, CURRENCY),
          lineTotal: new Money(-2000, CURRENCY),
          reversal: true,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const SingleDay = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_DAY,
    transaction: exampleTransaction({
      payinTotal: new Money(4500, CURRENCY),
      payoutTotal: new Money(4500, CURRENCY),
      lineItems: [
        {
          code: 'line-item/day',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(1),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(4500, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 15)),
    }),
  },
};

export const MultipleDays = {
  component: BookingBreakdown,
  props: {
    userRole: 'customer',
    unitType: LINE_ITEM_DAY,
    transaction: exampleTransaction({
      payinTotal: new Money(9000, CURRENCY),
      payoutTotal: new Money(9000, CURRENCY),
      lineItems: [
        {
          code: 'line-item/day',
          includeFor: ['customer', 'provider'],
          quantity: new Decimal(2),
          unitPrice: new Money(4500, CURRENCY),
          lineTotal: new Money(9000, CURRENCY),
          reversal: false,
        },
      ],
    }),
    booking: exampleBooking({
      start: new Date(Date.UTC(2017, 3, 14)),
      end: new Date(Date.UTC(2017, 3, 16)),
    }),
  },
};
