import { FC } from 'react';

// ==========================================:
const UserNotifications: FC = () => {
	return (
		<>
			<div className="main-content__header">
				<h2 className="section-title">Notifications</h2>
			</div>
			<div className="content-block content-block--medium">
				<div className="content-block__header">
					<div className="content-block__title">
						<span className="content-block__title-icon icon-directbox-notif" />
						<span className="content-block__title-text">Notifications</span>
					</div>
				</div>
				<div className="content-block__main">
					<div className="push-list">
						<div className="push-notify">
							<span className="push-notify__title">Email notifications</span>
							<div className="push-notify__row">
								<p className="push-notify__desc">
									If you want to receive email notifications, move the switch to the
									&#8216;On&#8216; position.
								</p>
								<div className="switch switch--type2">
									<label className="switch__label">
										<input type="checkbox" className="hidden" />
										<span className="switch__toggler" />
									</label>
								</div>
							</div>
						</div>
						<div className="push-notify">
							<span className="push-notify__title">SMS notifications</span>
							<div className="push-notify__row">
								<p className="push-notify__desc">
									If you want to receive push notifications, move the switch to the &#8216;On&#8216;
									position.
								</p>
								<div className="switch switch--type2">
									<label className="switch__label">
										<input type="checkbox" className="hidden" />
										<span className="switch__toggler" />
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserNotifications;
