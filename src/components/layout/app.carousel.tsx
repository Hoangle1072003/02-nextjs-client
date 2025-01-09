import React from 'react';
import {Carousel, Row, Col} from 'antd';

const AppCarousel: React.FC = () => (
    <Carousel autoplay effect="fade" style={{
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    }}>
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <div style={{borderRadius: '10px', overflow: 'hidden'}}>
                        <img
                            src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/28/97/c5/b982b88fe53ccf21049f56533483207b.jpg.webp"
                            alt="Image 1"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{borderRadius: '10px', overflow: 'hidden'}}>
                        <img
                            src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/67/76/6b/9b929aa12afc2e98f72d001ed72e7371.jpg.webp"
                            alt="Image 3"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </div>
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <div style={{borderRadius: '10px', overflow: 'hidden'}}>
                        <img
                            src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/67/76/6b/9b929aa12afc2e98f72d001ed72e7371.jpg.webp"
                            alt="Image 3"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{borderRadius: '10px', overflow: 'hidden'}}>
                        <img
                            src="https://salt.tikicdn.com/cache/w750/ts/tikimsp/28/97/c5/b982b88fe53ccf21049f56533483207b.jpg.webp"
                            alt="Image 1"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    </Carousel>
);

export default AppCarousel;
