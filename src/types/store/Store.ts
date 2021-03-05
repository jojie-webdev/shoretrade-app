import { RouterState } from 'connected-react-router';
import { History } from 'history';
import {
  AddSellerLicenseMeta,
  AddSellerLicensePayload,
} from 'types/store/AddSellerLicenseState';
import {
  CreateBulkListingMeta,
  CreateBulkListingPayload,
} from 'types/store/CreateBulkListingState';
import {
  CreateMarketOfferMeta,
  CreateMarketOfferPayload,
} from 'types/store/CreateMarketOfferState';
import {
  GetAccountCompletionMeta,
  GetAccountCompletionPayload,
} from 'types/store/GetAccountCompletionState';
import {
  GetActiveOffersMeta,
  GetActiveOffersPayload,
} from 'types/store/GetActiveOffersState';
import {
  GetAllMarketRequestMeta,
  GetAllMarketRequestPayload,
} from 'types/store/GetAllMarketRequestState';
import {
  GetMarketInterestsMeta,
  GetMarketInterestsPayload,
} from 'types/store/GetMarketInterestsState';
import {
  GetSellerLicenseMeta,
  GetSellerLicensePayload,
} from 'types/store/GetSellerLicenseState';
import {
  UpdateMarketInterestsMeta,
  UpdateMarketInterestsPayload,
} from 'types/store/UpdateMarketInterestsState';
import {
  UpdateSellerLicenseMeta,
  UpdateSellerLicensePayload,
} from 'types/store/UpdateSellerLicenseState';
import { UploadBulkMeta, UploadBulkPayload } from 'types/store/UploadBulkState';

import { AddAddressMeta, AddAddressPayload } from './AddAddressState';
import { AddCardTokenMeta, AddCardTokenPayload } from './AddCardTokenState';
import {
  AddLinkedAccountMeta,
  AddLinkedAccountPayload,
} from './AddLinkedAccountState';
import { AsyncState } from './AsyncState';
import { AuthState } from './AuthState';
import { CartState } from './CartState';
import {
  ChangePasswordMeta,
  ChangePasswordPayload,
} from './ChangePasswordState';
import { ChargeCardMeta, ChargeCardPayload } from './ChargeCardState';
import { ConfirmWeightMeta, ConfirmWeightPayload } from './ConfirmWeightState';
import {
  CreateCustomListingMeta,
  CreateCustomListingPayload,
} from './CreateCustomListingState';
import { CreateListingMeta, CreateListingPayload } from './CreateListingState';
import { CurrentAddressState } from './CurrentAddressState';
import { DeleteCardMeta, DeleteCardPayload } from './DeleteCardState';
import {
  DeleteLinkedAccountMeta,
  DeleteLinkedAccountPayload,
} from './DeleteLinkedAccountState';
import { EditableListingState } from './EditableListingState';
import { EditableMarketRequestPayload } from './EditableMarketRequest';
import { EndListingMeta, EndListingPayload } from './EndListingState';
import {
  ForgotPasswordMeta,
  ForgotPasswordPayload,
} from './ForgotPasswordState';
import { GetAddressesMeta, GetAddressesPayload } from './GetAddressesState';
import {
  GetAllListingsMeta,
  GetAllListingsPayload,
} from './GetAllListingsState';
import {
  GetBankDetailsMeta,
  GetBankDetailsPayload,
} from './GetBankDetailsState';
import {
  GetBuyerHomepageMeta,
  GetBuyerHomepagePayload,
} from './GetBuyerHomepageState';
import {
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload,
} from './GetBuyerOrdersState';
import {
  GetBuyerSearchFilterDataMeta,
  GetBuyerSearchFilterDataPayload,
} from './GetBuyerSearchFilterDataState';
import { GetCoopUsersMeta, GetCoopUsersPayload } from './GetCoopUsersState';
import {
  GetCustomFormDataMeta,
  GetCustomFormDataPayload,
} from './GetCustomFormDataState';
import {
  GetLinkedAccountsMeta,
  GetLinkedAccountsPayload,
} from './GetLinkedAccountsState';
import {
  GetListingBoxesMeta,
  GetListingBoxesPayload,
} from './GetListingBoxesState';
import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
} from './GetListingFormDataState';
import {
  GetListingsByTypeMeta,
  GetListingsByTypePayload,
} from './GetListingsByTypeState';
import { GetListingMeta, GetListingPayload } from './GetListingState';
import {
  GetListingTypesByCategoryMeta,
  GetListingTypesByCategoryPayload,
} from './GetListingTypesByCategoryState';
import {
  GetMarketEstimateMeta,
  GetMarketEstimatePayload,
} from './GetMarketEstimateState';
import {
  GetMarketNotificationMeta,
  GetMarketNotificationPayload,
} from './GetMarketNotificationState';
import {
  GetPaymentMethodsMeta,
  GetPaymentMethodsPayload,
} from './GetPaymentMethodsState';
import { GetSellerByIdMeta, GetSellerByIdPayload } from './GetSellerByIdState';
import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from './GetSellerOrdersState';
import {
  GetShippingQuoteMeta,
  GetShippingQuotePayload,
} from './GetShippingQuoteState';
import {
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload,
} from './GetTransactionHistoryState';
import { GetUserMeta, GetUserPayload } from './GetUserState';
import { HistoryState } from './HistoryState';
import { LoginMeta, LoginPayload } from './LoginState';
import { RequestLogState } from './LogRequestState';
import { OrderMeta, OrderPayload } from './OrderState';
import { PlaceOrderMeta, PlaceOrderPayload } from './PlaceOrderState';
import {
  ReadMarketNotificationMeta,
  ReadMarketNotificationPayload,
} from './ReadMarketNotificationState';
import { RegisterMeta, RegisterPayload } from './RegisterState';
import {
  ResendVerificationMeta,
  ResendVerificationPayload,
} from './ResendVerificationState';
import { ResetPasswordMeta, ResetPasswordPayload } from './ResetPasswordState';
import {
  SearchAndCountProductTypeMeta,
  SearchAndCountProductTypePayload,
} from './SearchAndCountProductTypeState';
import {
  SearchProductTypeMeta,
  SearchProductTypePayload,
} from './SearchProductTypeState';
import { SendMessageMeta, SendMessagePayload } from './SendMessageState';
import { UpdateAddressMeta, UpdateAddressPayload } from './UpdateAddressState';
import {
  UpdateBankDetailsMeta,
  UpdateBankDetailsPayload,
} from './UpdateBankDetailsState';
import {
  UpdateDefaultCardMeta,
  UpdateDefaultCardPayload,
} from './UpdateDefaultCardState';
import {
  UpdateFavoriteSellerMeta,
  UpdateFavoriteSellerPayload,
} from './UpdateFavoriteSellerState';
import {
  UpdateFavouriteProductMeta,
  UpdateFavouriteProductPayload,
} from './UpdateFavouriteProductState';
import { UpdateListingMeta, UpdateListingPayload } from './UpdateListingState';
import { UpdateUserPayload, UpdateUserMeta } from './UpdateUserState';
import { VerifyMeta, VerifyPayload } from './VerifyState';

export interface Store {
  router: RouterState<History.UnknownFacade>;
  auth: AuthState;
  login: AsyncState<LoginMeta, LoginPayload>;
  verify: AsyncState<VerifyMeta, VerifyPayload>;
  register: AsyncState<RegisterMeta, RegisterPayload>;
  forgotPassword: AsyncState<ForgotPasswordMeta, ForgotPasswordPayload>;
  resendVerification: AsyncState<
    ResendVerificationMeta,
    ResendVerificationPayload
  >;
  getAllListings: AsyncState<GetAllListingsMeta, GetAllListingsPayload>;
  endListing: AsyncState<EndListingMeta, EndListingPayload>;
  getUser: AsyncState<GetUserMeta, GetUserPayload>;
  getCoopUsers: AsyncState<GetCoopUsersMeta, GetCoopUsersPayload>;
  searchProductType: AsyncState<
    SearchProductTypeMeta,
    SearchProductTypePayload
  >;
  editableListing: EditableListingState;
  editableMarketRequest: EditableMarketRequestPayload;
  getListingFormData: AsyncState<
    GetListingFormDataMeta,
    GetListingFormDataPayload
  >;
  createListing: AsyncState<CreateListingMeta, CreateListingPayload>;
  updateUser: AsyncState<UpdateUserMeta, UpdateUserPayload>;
  changePassword: AsyncState<ChangePasswordMeta, ChangePasswordPayload>;
  getAddresses: AsyncState<GetAddressesMeta, GetAddressesPayload>;
  addAddress: AsyncState<AddAddressMeta, AddAddressPayload>;
  updateAddress: AsyncState<UpdateAddressMeta, UpdateAddressPayload>;
  getLinkedAccounts: AsyncState<
    GetLinkedAccountsMeta,
    GetLinkedAccountsPayload
  >;
  addLinkedAccount: AsyncState<AddLinkedAccountMeta, AddLinkedAccountPayload>;
  deleteLinkedAccount: AsyncState<
    DeleteLinkedAccountMeta,
    DeleteLinkedAccountPayload
  >;
  getBankDetails: AsyncState<GetBankDetailsMeta, GetBankDetailsPayload>;
  updateBankDetails: AsyncState<
    UpdateBankDetailsMeta,
    UpdateBankDetailsPayload
  >;
  confirmWeight: AsyncState<ConfirmWeightMeta, ConfirmWeightPayload>;
  placeOrder: AsyncState<PlaceOrderMeta, PlaceOrderPayload>;
  getSellerOrdersPlaced: AsyncState<
    GetSellerOrdersMeta,
    GetSellerOrdersPayload
  >;
  getSellerOrdersTransit: AsyncState<
    GetSellerOrdersMeta,
    GetSellerOrdersPayload
  >;
  getSellerOrdersDelivered: AsyncState<
    GetSellerOrdersMeta,
    GetSellerOrdersPayload
  >;
  getCustomFormData: AsyncState<
    GetCustomFormDataMeta,
    GetCustomFormDataPayload
  >;
  createCustomListing: AsyncState<
    CreateCustomListingMeta,
    CreateCustomListingPayload
  >;
  updateListing: AsyncState<UpdateListingMeta, UpdateListingPayload>;
  searchAndCountProductType: AsyncState<
    SearchAndCountProductTypeMeta,
    SearchAndCountProductTypePayload
  >;
  currentAddress: CurrentAddressState;
  getBuyerHomepage: AsyncState<GetBuyerHomepageMeta, GetBuyerHomepagePayload>;
  getListingTypesByCategory: AsyncState<
    GetListingTypesByCategoryMeta,
    GetListingTypesByCategoryPayload
  >;
  getBuyerSearchFilterData: AsyncState<
    GetBuyerSearchFilterDataMeta,
    GetBuyerSearchFilterDataPayload
  >;
  getListingsByType: AsyncState<
    GetListingsByTypeMeta,
    GetListingsByTypePayload
  >;
  getListing: AsyncState<GetListingMeta, GetListingPayload>;
  getListingBoxes: AsyncState<GetListingBoxesMeta, GetListingBoxesPayload>;
  history: HistoryState;
  updateFavouriteProduct: AsyncState<
    UpdateFavouriteProductMeta,
    UpdateFavouriteProductPayload
  >;
  cart: CartState;
  getShippingQuote: AsyncState<GetShippingQuoteMeta, GetShippingQuotePayload>;
  order: AsyncState<OrderMeta, OrderPayload>;
  getTransactionHistory: AsyncState<
    GetTransactionHistoryMeta,
    GetTransactionHistoryPayload
  >;
  getPaymentMethods: AsyncState<
    GetPaymentMethodsMeta,
    GetPaymentMethodsPayload
  >;
  addCardToken: AsyncState<AddCardTokenMeta, AddCardTokenPayload>;
  updateDefaultCard: AsyncState<
    UpdateDefaultCardMeta,
    UpdateDefaultCardPayload
  >;
  deleteCard: AsyncState<DeleteCardMeta, DeleteCardPayload>;
  chargeCard: AsyncState<ChargeCardMeta, ChargeCardPayload>;
  getBuyerOrdersPlaced: AsyncState<GetBuyerOrdersMeta, GetBuyerOrdersPayload>;
  getBuyerOrdersTransit: AsyncState<GetBuyerOrdersMeta, GetBuyerOrdersPayload>;
  getBuyerOrdersDelivered: AsyncState<
    GetBuyerOrdersMeta,
    GetBuyerOrdersPayload
  >;
  getSellerById: AsyncState<GetSellerByIdMeta, GetSellerByIdPayload>;
  updateFavoriteSeller: AsyncState<
    UpdateFavoriteSellerMeta,
    UpdateFavoriteSellerPayload
  >;
  sellerDashboardDate: any;
  sendMessage: AsyncState<SendMessageMeta, SendMessagePayload>;
  getMarketEstimate: AsyncState<
    GetMarketEstimateMeta,
    GetMarketEstimatePayload
  >;
  resetPassword: AsyncState<ResetPasswordMeta, ResetPasswordPayload>;
  logRequest: RequestLogState;
  getAccountCompletion: AsyncState<
    GetAccountCompletionMeta,
    GetAccountCompletionPayload
  >;
  getMarketInterests: AsyncState<
    GetMarketInterestsMeta,
    GetMarketInterestsPayload
  >;
  updateMarketInterests: AsyncState<
    UpdateMarketInterestsMeta,
    UpdateMarketInterestsPayload
  >;
  getSellerLicense: AsyncState<GetSellerLicenseMeta, GetSellerLicensePayload>;
  addSellerLicense: AsyncState<AddSellerLicenseMeta, AddSellerLicensePayload>;
  updateSellerLicense: AsyncState<
    UpdateSellerLicenseMeta,
    UpdateSellerLicensePayload
  >;
  uploadBulk: AsyncState<UploadBulkMeta, UploadBulkPayload>;
  createBulkListing: AsyncState<
    CreateBulkListingMeta,
    CreateBulkListingPayload
  >;
  getAllMarketRequest: AsyncState<
    GetAllMarketRequestMeta,
    GetAllMarketRequestPayload
  >;
  getActiveOffers: AsyncState<GetActiveOffersMeta, GetActiveOffersPayload>;
  createMarketOffer: AsyncState<
    CreateMarketOfferMeta,
    CreateMarketOfferPayload
  >;
  getMarketNotification: AsyncState<
    GetMarketNotificationMeta,
    GetMarketNotificationPayload
  >;
  readMarketNotification: AsyncState<
    ReadMarketNotificationMeta,
    ReadMarketNotificationPayload
  >;
}
