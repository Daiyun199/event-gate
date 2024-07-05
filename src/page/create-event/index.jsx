import React, { useState } from 'react'
import "./index.scss"
import Menu from '../../component/menu'
import Button from '../../component/button'
import { Form, Image, Input, Modal, Select, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import StepNavigation from '../../component/step-navigation'
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '../../utils/upload'
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function CreateEvent() {
    const [form] = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    async function handleSubmit(values) {
        console.log(values);
        const response = await uploadFile(values.poster.file.originFileObj);
        console.log(response);
    }

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <div className='wrapper-event'>
            <div className="wrapper-event__left">
                <Menu />
            </div>
            <div className="wrapper-event__right">
                <div>
                    <StepNavigation />
                </div>
                <div className="wrapper-event__right__form">
                    <h1 className='wrapper-event__right__form__header'>Event Information</h1>
                    <div className="wrapper-event__right__form__top">
                        <div className="wrapper-event__right__form__top__img">
                            <img src="https://i.pinimg.com/564x/7f/64/40/7f64400e5b340ef5e040f998fbba07a6.jpg"
                            />
                        </div>
                        <div className="wrapper-event__right__form__top__info">
                            <div className="wrapper-event__right__form__top__info__container">
                                <div className="wrapper-event__right__form__top__info__container__row">
                                    <div className="wrapper-event__right__form__top__info__container__row__label">Event Name</div>
                                    <div className="wrapper-event__right__form__top__info__container__row__value">SkyTour-MTP</div>
                                </div>
                                <div className="wrapper-event__right__form__top__info__container__row">
                                    <div className="wrapper-event__right__form__top__info__container__row__label">Location</div>
                                    <div className="wrapper-event__right__form__top__info__container__row__value"></div>
                                </div>
                                <div className="wrapper-event__right__form__top__info__container__row">
                                    <div className="wrapper-event__right__form__top__info__container__row__label">Event Type</div>
                                    <div className="wrapper-event__right__form__top__info__container__row__value">
                                        <select className="dropdown">
                                            <option>Music</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="wrapper-event__right__form__top__info__container__row">
                                    <div className="wrapper-event__right__form__top__info__container__row__label">Description</div>
                                    <div className="wrapper-event__right__form__top__info__container__row__value"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-event__right__form__bot">
                        <div className="wrapper-event__right__form__bot__img">
                            <img src="https://i.pinimg.com/564x/ee/3f/59/ee3f5998b83ba242e44795d6f7e8933b.jpg"
                            />
                        </div>
                        <div className="wrapper-event__right__form__bot__info">
                            <div className="wrapper-event__right__form__bot__info__container">
                                <div className="wrapper-event__right__form__bot__info__container__row">
                                    <div className="wrapper-event__right__form__bot__info__container__row__label">Club Name</div>
                                    <div className="wrapper-event__right__form__bot__info__container__row__value">FBK</div>
                                </div>
                                <div className="wrapper-event__right__form__bot__info__container__row">
                                    <div className="wrapper-event__right__form__bot__info__container__row__label">
                                        Club Information
                                        <div className="wrapper-event__right__form__bot__info__container__row__label__1">

                                        </div>
                                        <div className="wrapper-event__right__form__bot__info__container__row__label__2"></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper-event__right__button">
                    <Button variant='custom2' customColor="black" buttonText="Add" onClick={handleOpenModal} />
                    <Modal title="Event Information" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Form form={form}
                            labelCol={{
                                span: 24,
                            }}
                            onFinish={handleSubmit}
                        >
                            <Form.Item label="Event Name" name="name">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Location" name="location">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Event Type" name="type">
                                <Select
                                    options={[
                                        { value: "Music", label: <span>Music</span> },
                                        { value: "Fashion", label: <span>Fashion</span> },
                                        { value: "Talent", label: <span>Talent</span> },
                                        { value: "Book", label: <span>Book</span> },
                                        { value: "Culture", label: <span>Culture</span> },
                                        { value: "Environment", label: <span>Environment</span> },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item label="Description" name="description">
                                <Input.TextArea rows={4} />
                            </Form.Item>
                            <Form.Item label="Poster" name="poster">
                                <Upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>

            </div>
        </div>
    )
}

export default CreateEvent
