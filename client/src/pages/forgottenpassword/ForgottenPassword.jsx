import React from 'react'
import { Typography } from 'antd';
import { CheckOutlined, HighlightOutlined } from '@ant-design/icons';
const { Title } = Typography;

function ForgottenPassword() {
  return (
    <div>
        <Title level={3}>Для восстановления пароля напишите на почту нашей техподдержки:</Title>
        <Title copyable={{
          tooltips: ['Скопировать адрес', 'Адрес скопирован'],
        }} level={4} type="success">naglampe@mail.ru</Title>
    </div>
  )
}

export default ForgottenPassword