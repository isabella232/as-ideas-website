import React from 'react';

import JobService from '../../services/JobService';
import Terminal from './Terminal/Terminal';
import NotFound from '../NotFound/NotFound';
import Loader from '../Loader/Loader';
import SocialBar from './SocialBar/SocialBar';
import { Helmet } from 'react-helmet';
import { trimTo256 } from "./utils/social";

import './JobDetailsView.scss'

class JobDetailsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobData: null,
            showLoader: true
        };
    }

    componentDidMount() {
        let jobId = this.props.match.params.jobId;
        JobService.getJobById(jobId)
            .then((jobData) => {
                this.setState({ jobData, showLoader: false });
            })
            .catch(e => {
                console.log(e);
                this.setState({ showLoader: false })
            })
    }

    render() {
        let job = this.state.jobData;

        let randomImage = '/recruiting/' + (Math.floor(Math.random() * 6) + 1) + '.jpg'
        let summary = "Axel Springer Ideas ist eine 100 prozentige Tochter der Axel Springer SE. Wir arbeiten als Startup im Konzern und finden Lösungen rund um das Thema Digitaler Content. Wir agieren als Innovationstreiber und setzen je nach Aufgabenstellung von Prototypen bis Plattformen das beste Ergebnis um.";

        let socialBarData;
        if (this.state.jobData) {
            socialBarData = {
                title: job.title._cdata,
                summary,
                url: window.location.href
            }
        }

        return (
            <section className='jobDetailsView centered'>
                <Helmet>
                    <title>ideas engineering ⚡ {`${job.title._cdata}`}</title>
                    <meta property="og:url" content={window.location.href} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={job.title._cdata} />
                    <meta property="og:description" content={trimTo256(summary)} />
                    <meta property="og:image" content={window.location.protocol + '//' + window.location.host + randomImage} />
                </Helmet>
                {this.state.showLoader ? (
                    <Loader />
                ) : this.state.jobData ? (
                    <div className='jobDetailsView__container'>
                        <div className='jobDetailsView__subnav'>
                            <a className='jobDetailsView__section' href='/jobs'>Career</a>
                            <SocialBar object={socialBarData} />
                        </div>
                        <div className='jobDetailsView__heading sectionHeading'>
                            <h1>{job.title._cdata}</h1>
                            <a className='jobDetailsView__applyButton' href={job.urlApplicationUrl._cdata} target="_blank" >bewerben!</a>
                        </div>
                        <div>
                            <div className='jobDetailsView__hero'>
                                <div className='image' style={{ backgroundImage: `url(${randomImage})` }}></div>
                            </div>
                            <p className='jobDetailsView__content--heading'>{job.titleTasks._cdata}</p>
                            <p className='jobDetailsView__content' dangerouslySetInnerHTML={{ __html: job.htmlTasks._cdata }} />
                            <p className='jobDetailsView__content--heading'>{job.titleProfile._cdata}</p>
                            <p className='jobDetailsView__content' dangerouslySetInnerHTML={{ __html: job.htmlProfile._cdata }} />
                            <p className='jobDetailsView__content--heading'>{job.titleOffer._cdata}</p>
                            <p className='jobDetailsView__content' dangerouslySetInnerHTML={{ __html: job.htmlOffer._cdata }} />
                            <p className='jobDetailsView__content--heading'>{job.titleContact._cdata}</p>
                            <p className='jobDetailsView__content' dangerouslySetInnerHTML={{ __html: job.htmlContact._cdata }} />
                            <p className='jobDetailsView__content jobDetailsView__content--no-heading' dangerouslySetInnerHTML={{ __html: job.htmlInfoEqualRights._cdata }} />

                            <div className='jobDetailsView__shareApply'>
                                <SocialBar object={socialBarData} />
                                <a className='jobDetailsView__applyButton' href={job.urlApplicationUrl._cdata} target="_blank" >bewerben!</a>
                            </div>

                            <Terminal url={job.urlApplicationUrl._cdata} />
                        </div>
                    </div>
                ) : (
                            <NotFound />
                        )
                }
            </section>
        );
    };
}

export default JobDetailsView;
