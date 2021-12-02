/* PLOP_INJECT_IMPORT */

import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { GenericResponse } from 'types/GenericResponse';
import {
  AddCardAndPayMeta,
  AddCardAndPayPayload,
} from 'types/store/AddCardAndPayState';
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
  MarketOfferItem,
} from 'types/store/CreateMarketOfferState';
import {
  GetAccountCompletionMeta,
  GetAccountCompletionPayload,
} from 'types/store/GetAccountCompletionState';
import {
  GetActiveOffersMeta,
  GetActiveOffersPayload,
  NegotiateOfferMeta,
  NegotiatePayload,
} from 'types/store/GetActiveOffersState';
import {
  GetAllMarketRequestFiltersMeta,
  GetAllMarketRequestFiltersPayload,
} from 'types/store/GetAllMarketRequestFiltersState';
import {
  GetAllMarketRequestMeta,
  GetAllMarketRequestPayload,
} from 'types/store/GetAllMarketRequestState';
import {
  GetAvailableCratesMeta,
  GetAvailableCratesPayload,
} from 'types/store/GetAvailableCrates';
import { GetCratesMeta, GetCratesPayload } from 'types/store/GetCrates';
import {
  GetMarketInterestsMeta,
  GetMarketInterestsPayload,
} from 'types/store/GetMarketInterestsState';
import {
  GetSellerLicenseMeta,
  GetSellerLicensePayload,
} from 'types/store/GetSellerLicenseState';
import {
  MarketOfferPayload,
  NegotiateOffer,
  OfferConfirm,
} from 'types/store/MarketOfferState';
import {
  UpdateMarketInterestsMeta,
  UpdateMarketInterestsPayload,
} from 'types/store/UpdateMarketInterestsState';
import {
  UpdateSellerLicenseMeta,
  UpdateSellerLicensePayload,
} from 'types/store/UpdateSellerLicenseState';
import {
  UploadBulkMeta,
  UploadBulkPayload,
  UploadBulkState,
} from 'types/store/UploadBulkState';

import { AddAddressMeta, AddAddressPayload } from './AddAddressState';
import { AddCardTokenMeta, AddCardTokenPayload } from './AddCardTokenState';
import { AddCartItemMeta, AddCartItemPayload } from './AddCartItemState';
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
import {
  DeleteMarketRequestOfferMeta,
  DeleteMarketRequestOfferPayload,
} from './DeleteMarketRequestOfferState';
import {
  DeleteMarketRequestMeta,
  DeleteMarketRequestPayload,
} from './DeleteMarketRequestState';
import {
  DeleteNotificationMetaData,
  DeleteNotificationPayload,
} from './DeleteNotificationState';
import { EditableListingState } from './EditableListingState';
import {
  EditableMarketRequestPayload,
  EditableMarketRequestMeta,
} from './EditableMarketRequest';
import { EndListingMeta, EndListingPayload } from './EndListingState';
import {
  ForgotPasswordMeta,
  ForgotPasswordPayload,
} from './ForgotPasswordState';
import { GetAddressesMeta, GetAddressesPayload } from './GetAddressesState';
import {
  GetAllBuyerListingsMeta,
  GetAllBuyerListingsPayload,
} from './GetAllBuyerListingsState';
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
import { GetCartMeta, GetCartPayload } from './GetCartState';
import { GetCoopUsersMeta, GetCoopUsersPayload } from './GetCoopUsersState';
import {
  GetCustomFormDataMeta,
  GetCustomFormDataPayload,
} from './GetCustomFormDataState';
import {
  GetHistoricalListingsMeta,
  GetHistoricalListingsPayload,
} from './GetHistoricalListingsState';
import {
  GetLinkedAccountsMeta,
  GetLinkedAccountsPayload,
} from './GetLinkedAccountsState';
import {
  GetListingBoxesMeta,
  GetListingBoxesPayload,
} from './GetListingBoxesState';
import { 
  GetListingByIdMeta, 
  GetListingByIdPayload 
} from './GetListingByIdState';
import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
} from './GetListingFormDataState';
import { 
  GetListingsBySalesChannelMeta,
  GetListingsBySalesChannelPayload  
} from './GetListingsBySalesChannelState';
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
  GetMarketRequestBuyerFiltersMeta,
  GetMarketRequestBuyerFiltersPayload,
} from './GetMarketRequestBuyerFiltersState';
import {
  GetNotificationsSettingsMeta,
  GetNotificationsSettingsPayload,
} from './GetNotificationSettingsState';
import {
  GetNotificationsMeta,
  GetNotificationsPayload,
} from './GetNotificationsState';
import {
  GetPaymentMethodsMeta,
  GetPaymentMethodsPayload,
} from './GetPaymentMethodsState';
import { GetPaymentModeMeta, GetPaymentModePayload } from './GetPaymentMode';
import { GetSellerByIdMeta, GetSellerByIdPayload } from './GetSellerByIdState';
import {
  GetSellerDashboardSalesMeta,
  GetSellerDashboardSalesPayload,
} from './GetSellerDashboardSalesState';
import {
  GetSellerDashboardTopCategoriesMeta,
  GetSellerDashboardTopCategoriesPayload,
} from './GetSellerDashboardTopCategoriesState';
import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from './GetSellerOrdersState';
import {
  GetShippingQuoteMeta,
  GetShippingQuotePayload,
} from './GetShippingQuoteState';
import { GetStatesMeta, GetStatesPayload } from './GetStatesState';
import {
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload,
} from './GetTransactionHistoryState';
import { GetUserMeta, GetUserPayload } from './GetUserState';
import { GlobalModalState } from './GlobalModalState';
import { HistoryState } from './HistoryState';
import { LoginMeta, LoginPayload } from './LoginState';
import { RequestLogState } from './LogRequestState';
import {
  AcceptOffer,
  MarketOfferState,
  NegotiationPayload,
} from './MarketOfferState';
import { NotifyState } from './NotifyState';
import { OrderMeta, OrderPayload } from './OrderState';
import { PlaceOrderMeta, PlaceOrderPayload } from './PlaceOrderState';
import {
  ReadMarketNotificationMeta,
  ReadMarketNotificationPayload,
} from './ReadMarketNotificationState';
import {
  ReadNotificationMetaData,
  ReadNotificationPayload,
} from './ReadNotificationState';
import { RegisterMeta, RegisterPayload } from './RegisterState';
import {
  RemoveCartItemMeta,
  RemoveCartItemPayload,
} from './RemoveCartItemState';
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
import { SendDisputeMeta, SendDisputePayload } from './SendDisputeState';
import { SendMessageMeta, SendMessagePayload } from './SendMessageState';
import {
  SendOrderRatingMeta,
  SendOrderRatingPayload,
} from './SendOrderRatingState';
import { SocketState } from './SocketState';
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
import {
  UpdateNotificationSettingsPayload,
  UpdateNotificationSettingsMetaData,
} from './UpdateNotificationSettingsState';
import { UpdateUserPayload, UpdateUserMeta } from './UpdateUserState';
import { VerifyMeta, VerifyPayload } from './VerifyState';

export interface Store {
  /* PLOP_INJECT_INSTANCE */
  getHistoricalListings: AsyncState<
    GetHistoricalListingsMeta,
    GetHistoricalListingsPayload
  >;
  sendOrderRating: AsyncState<SendOrderRatingMeta, SendOrderRatingPayload>;
  globalModal: GlobalModalState;
  removeCartItem: AsyncState<RemoveCartItemMeta, RemoveCartItemPayload>;
  addCartItem: AsyncState<AddCartItemMeta, AddCartItemPayload>;
  getCart: AsyncState<GetCartMeta, GetCartPayload>;
  getSellerDashboardTopCategories: AsyncState<
    GetSellerDashboardTopCategoriesMeta,
    GetSellerDashboardTopCategoriesPayload
  >;
  getSellerDashboardSales: AsyncState<
    GetSellerDashboardSalesMeta,
    GetSellerDashboardSalesPayload
  >;
  socket: SocketState;
  router: RouterState<History.UnknownFacade>;
  auth: AuthState;
  login: AsyncState<LoginMeta, LoginPayload>;
  logout: AsyncState<string, LoginPayload>;
  verify: AsyncState<VerifyMeta, VerifyPayload>;
  register: AsyncState<RegisterMeta, RegisterPayload>;
  forgotPassword: AsyncState<ForgotPasswordMeta, ForgotPasswordPayload>;
  resendVerification: AsyncState<
    ResendVerificationMeta,
    ResendVerificationPayload
  >;
  getAllBuyerListings: AsyncState<
    GetAllBuyerListingsMeta,
    GetAllBuyerListingsPayload
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
  editableMarketRequest: EditableMarketRequestMeta;
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
  deleteMarketRequest: AsyncState<
    DeleteMarketRequestMeta,
    DeleteMarketRequestPayload
  >;
  deleteMarketRequestOffer: AsyncState<
    DeleteMarketRequestOfferMeta,
    DeleteMarketRequestOfferPayload
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
  getListingsBySalesChannel: AsyncState<
    GetListingsBySalesChannelMeta,
    GetListingsBySalesChannelPayload
  >;
  getListingsByType: AsyncState<
    GetListingsByTypeMeta,
    GetListingsByTypePayload
  >;
  getListing: AsyncState<GetListingMeta, GetListingPayload>;
  getListingBoxes: AsyncState<GetListingBoxesMeta, GetListingBoxesPayload>;
  getListingById: AsyncState<GetListingByIdMeta, GetListingByIdPayload>;
  getStates: AsyncState<GetStatesMeta, GetStatesPayload>;
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
  addCardAndPay: AsyncState<AddCardAndPayMeta, AddCardAndPayPayload>;
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
  sendDispute: AsyncState<SendDisputeMeta, SendDisputePayload>;
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
  getMarketRequestBuyerFilters: AsyncState<
    GetMarketRequestBuyerFiltersMeta,
    GetMarketRequestBuyerFiltersPayload
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
  getAllMarketRequestFilters: AsyncState<
    GetAllMarketRequestFiltersMeta,
    GetAllMarketRequestFiltersPayload
  >;
  getActiveOffers: AsyncState<GetActiveOffersMeta, GetActiveOffersPayload>;
  createMarketOffer: AsyncState<
    CreateMarketOfferMeta,
    CreateMarketOfferPayload
  >;
  createMarketRequest: AsyncState<
    EditableMarketRequestMeta,
    EditableMarketRequestPayload
  >;
  getMarketNotification: AsyncState<
    GetMarketNotificationMeta,
    GetMarketNotificationPayload
  >;
  readMarketNotification: AsyncState<
    ReadMarketNotificationMeta,
    ReadMarketNotificationPayload
  >;
  getPaymentMode: AsyncState<GetPaymentModeMeta, GetPaymentModePayload>;
  marketOfferNegotiate: AsyncState<NegotiateOfferMeta, NegotiatePayload>;
  marketOffer: MarketOfferState;
  marketRequestAcceptOffer: AsyncState<AcceptOffer, NegotiationPayload>;
  marketRequestOfferConfirm: AsyncState<OfferConfirm, GenericResponse>;
  marketRequestNegotiation: AsyncState<NegotiateOffer, NegotiationPayload>;
  notify: NotifyState;
  modifyBulkUpload: {
    modifiedData: Record<number, Partial<UploadBulkState>>;
    currentData: Partial<UploadBulkState> & {
      index?: number;
      currentStep?: number;
    };
  };
  getCrates: AsyncState<GetCratesMeta, GetCratesPayload>;
  getAvailableCrates: AsyncState<
    GetAvailableCratesMeta,
    GetAvailableCratesPayload
  >;
  getNotificationsSettings: AsyncState<
    GetNotificationsSettingsMeta,
    GetNotificationsSettingsPayload
  >;
  getNotifications: AsyncState<GetNotificationsMeta, GetNotificationsPayload>;
  updateNotificationSettings: AsyncState<
    UpdateNotificationSettingsMetaData,
    UpdateNotificationSettingsPayload
  >;
  readNotification: AsyncState<
    ReadNotificationMetaData,
    ReadMarketNotificationPayload
  >;
  deleteNotification: AsyncState<
    DeleteNotificationMetaData,
    DeleteNotificationPayload
  >;
}
