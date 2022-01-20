/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'i18n-react';
import { getUserSettingsData } from 'redux/reducers/settings/selectors';
import UserKycOndatoPopup from 'components/UserAccount/UserKycOndatoPopup';
import { getKycOndatoUserDataRequest } from 'redux/reducers/kyc/reducer';
import { getKycOndatoUserData } from 'redux/reducers/kyc/selectors';
import { Link } from 'react-router-dom';

// ==========================================:
const UserData: FC = () => {
	const userData = useSelector(getUserSettingsData);
	const userOndatoKycData = useSelector(getKycOndatoUserData);

	const [iosLink, setIosLink] = useState<{ url: string; params: any }>({ url: '', params: {} });
	const [openModal, setOpenModal] = useState(false);
	const closeModal = () => setOpenModal(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getKycOndatoUserDataRequest());
	}, [dispatch]);

	const kysOndatoStartVerify =
		userOndatoKycData?.status === 'declined' ||
		userOndatoKycData?.status === 'cancelled' ||
		userData?.status?.name === 'unverified';

	const getKycOndatoStatusClasses = (status: string): string => {
		switch (status) {
			case 'approved':
				return 'user-data__td-desc user-data__td-desc--verify kyc';
			case 'pending':
				return 'user-data__td-desc user-data__td-desc--pending kyc';
			case 'declined':
				return 'user-data__td-desc user-data__td-desc--not-verify kyc';
			case 'cancelled':
				return 'user-data__td-desc user-data__td-desc--not-verify kyc';
			case 'unverified':
				return 'user-data__td-desc user-data__td-desc--not-verify kyc';

			default:
				return 'user-data__td-desc';
		}
	};

	return (
		<div className="content-block content-block--flex">
			<div className="content-block__header">
				<div className="content-block__title">
					<span className="content-block__title-icon icon-profile-circle" />
					<span className="content-block__title-text">
						{String(L.translate('Account.AccountSettings.changing_user_data'))}
					</span>
				</div>
			</div>
			<div className="content-block__main">
				<div className="user-data">
					<div className="user-data__tr">
						<div className="user-data__td">
							<span className="user-data__td-title">First Name:</span>
						</div>
						<div className="user-data__td">
							<span className="user-data__td-desc">
								{userData?.data?.first_name || '-----------------------'}
							</span>
						</div>
					</div>
					<div className="user-data__tr">
						<div className="user-data__td">
							<span className="user-data__td-title">Last Name:</span>
						</div>
						<div className="user-data__td">
							<span className="user-data__td-desc">
								{userData?.data?.last_name || '-----------------------'}
							</span>
						</div>
					</div>
					<div className="user-data__tr">
						<div className="user-data__td">
							<span className="user-data__td-title">Address:</span>
						</div>
						<div className="user-data__td">
							<span className="user-data__td-desc">2715 Ash Dr. San Jose, South Dakota 83475</span>
						</div>
					</div>
					<div className="user-data__tr">
						<div className="user-data__td">
							<span className="user-data__td-title">Phone Number:</span>
						</div>
						<div className="user-data__td">
							<span className="user-data__td-desc">
								{userData?.data?.phone || '-----------------------'}
							</span>
						</div>
					</div>
					<div className="user-data__tr">
						<div className="user-data__td">
							<span className="user-data__td-title">Date of Birth:</span>
						</div>
						<div className="user-data__td">
							<span className="user-data__td-desc">12/4/93</span>
						</div>
					</div>
					<div className="user-data__tr">
						<div className="user-data__td">
							<span className="user-data__td-title">Email:</span>
						</div>
						<div className="user-data__td">
							<span className="user-data__td-desc">{userData?.email}</span>
						</div>
					</div>
					<div className="user-data__tr">
						<div className="user-data__td">
							<span className="user-data__td-title">KYC</span>
						</div>
						<div className="user-data__td">
							<span
								className={getKycOndatoStatusClasses(
									userOndatoKycData?.status || userData?.status?.name || '',
								)}
							>
								{userOndatoKycData?.status || userData?.status?.name}
							</span>
							{kysOndatoStartVerify &&
								(iosLink?.url?.length ? (
									<Link
										to={{ pathname: iosLink?.url }}
										target="_blank"
										className="button button--type2 button--small-height kyc-ios-btn-link"
									>
										Go to Ondato KYC site
									</Link>
								) : (
									<>
										<button
											type="button"
											className="button button--type2 button--small-height"
											onClick={() => setOpenModal((prevOpenModal) => !prevOpenModal)}
										>
											Start Verification
										</button>
										<UserKycOndatoPopup
											openModal={openModal}
											closeModal={closeModal}
											setIosLink={setIosLink}
										/>
									</>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserData;
