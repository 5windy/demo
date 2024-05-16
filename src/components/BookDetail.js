import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const BookDetail = () => {
    const [params] = useSearchParams();

    console.log("params : " + params);

    const {isbn} = useParams();

    console.log("isbn : " + isbn.split(' ')[0]);

    return (
        <div>
            도서 상세 페이지 
        </div>
    );
};

export default BookDetail;