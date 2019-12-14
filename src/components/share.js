import React from 'react';
import PropTypes from 'prop-types';
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';

// Custom share component. Used with posts, services and works
const Share = ({ socialConfig, tags, style }) => (
    <div className={style.Share}>
        <FacebookShareButton url={socialConfig.config.siteUrl} className={`${style.SocialIcon} ${style.SocialIcon___facebook}`} quote={socialConfig.config.title} >
            <FacebookIcon size={32} round={true} iconBgStyle={{fill: '#c8cfb7'}} logoFillColor="#566063" />
        </FacebookShareButton>
        <TwitterShareButton url={socialConfig.config.siteUrl} className={`${style.SocialIcon} ${style.SocialIcon___twitter}`} title={socialConfig.config.title} via={socialConfig.owner.split('@').join('')} hashtags={tags} >
            <TwitterIcon size={32} round={true} iconBgStyle={{fill: '#c8cfb7'}} logoFillColor="#566063" />
        </TwitterShareButton>
        <WhatsappShareButton url={socialConfig.config.siteUrl} className={`${style.SocialIcon} ${style.SocialIcon___whatsapp}`} title={socialConfig.config.title} >
            <WhatsappIcon size={32} round={true} iconBgStyle={{fill: '#c8cfb7'}} logoFillColor="#566063" />
        </WhatsappShareButton>
        <LinkedinShareButton url={socialConfig.config.siteUrl} className={`${style.SocialIcon} ${style.SocialIcon___linkedin}`} title={socialConfig.config.title} >
            <LinkedinIcon size={32} round={true} iconBgStyle={{fill: '#c8cfb7'}} logoFillColor="#566063" />
        </LinkedinShareButton>
    </div>
);

Share.propTypes = {
    socialConfig: PropTypes.shape({
        owner: PropTypes.string.isRequired,
        config: PropTypes.shape({
            siteUrl: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.object
};
Share.defaultProps = {
    tags: [],
};

export default Share;