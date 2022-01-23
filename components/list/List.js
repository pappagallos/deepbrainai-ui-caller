import React from 'react';
import {useSelector} from 'react-redux';

// styles
import styles from './scss/List.module.scss';

function List() {
  const {callList} = useSelector(state => state.callList);

  return (
    <div className={styles.list_area}>
      <div className={styles.list_title}>
        <span>호출 안내</span>
      </div>
      {/* 테이블 태그 border-radius 가 적용이 안되어 div 태그로 전환 */}
      {/* <table>
                <colgroup>
                    <col width='30%' />
                    <col width='*' />
                </colgroup>
                <thead>
                    <tr>
                        <th>창구</th>
                        <th>호출이름</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span>1</span>
                        </td>
                        <td>
                            <span>이우진</span>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>8</td>
                    </tr>
                </tbody>
            </table> */}

      {/* 대기자 호출 리스트 헤더 */}
      <div className={styles.list_head}>
        <ul>
          <li>
            <span>창구</span>
          </li>
          <li>
            <span>호출이름</span>
          </li>
        </ul>
      </div>

      {/* 대기자 호출 리스트 */}
      <div className={styles.list_body}>
        <div className={styles.row_area}>
          {callList.length > 0 &&
            callList.map(item => (
              <div className={styles.row} key={item.video}>
                <div className={styles.number}>
                  <span>{item.counterNumber}</span>
                </div>
                <div className={styles.name}>
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default List;
