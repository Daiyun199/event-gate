import React, { useEffect, useState } from 'react'
import "./index.scss"
import Menu from '../../component/menu'
import Button from '../../component/button'
import { DatePicker, Form, Image, Input, InputNumber, Modal, Select, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form'
import StepNavigation from '../../component/step-navigation'
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '../../utils/upload'
import axios from 'axios'
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function CreateEvent() {
    const [eventType, setEventType] = useState([]);
    const [data, setData] = useState([]);
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
        const response = await uploadFile(values.poster.file.originFileObj);
        const responsePost = await axios.post("https://eventgateapi.azurewebsites.net/api/Event", values);
        setData(values);
        setIsModalOpen(false);
        form.resetFields();

    }
    async function fetchData() {
        const response = await axios.get("https://eventgateapi.azurewebsites.net/api/EventType");
        setEventType(response.data);
    }
    useEffect(function () {
        fetchData();
    }, []);

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
                                    <div className="wrapper-event__right__form__top__info__container__row__value">{data.eventName}</div>
                                </div>
                                <div className="wrapper-event__right__form__top__info__container__row">
                                    <div className="wrapper-event__right__form__top__info__container__row__label">Location</div>
                                    <div className="wrapper-event__right__form__top__info__container__row__value"> {data.location}</div>
                                </div>
                                <div className="wrapper-event__right__form__top__info__container__row">
                                    <div className="wrapper-event__right__form__top__info__container__row__label">Event Type</div>
                                    <div className="wrapper-event__right__form__top__info__container__row__value">{data.Event}</div>
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
                            <Form.Item label="Event Name" name="eventName" required>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Location" name="location" required>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Event Type" name="eventTypeID" required>
                                <Select
                                    options={eventType.map(option => ({
                                        value: option.eventTypeID,
                                        label: <span>{option.eventTypeName}</span>
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item label="Description" name="content" required>
                                <Input.TextArea rows={4} />
                            </Form.Item>
                            <Form.Item label="Poster" name="posterImage" required  >
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
                            <Form.Item label="Start-Date" name="startDate" required >
                                <DatePicker format="DD/MM/YYYY" />
                            </Form.Item>
                            <Form.Item label="End-Date" name="endDate" required>
                                <DatePicker format="DD/MM/YYYY" />
                            </Form.Item>
                            <Form.Item label="Quantity-Ticket" name="ticketQuantity" required>
                                <InputNumber min={0} />
                            </Form.Item>
                            <Form.Item label="Price" name="price" required >
                                <InputNumber min={0} />
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
