import AuthContext from "context/AuthContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { CommentInterface, PostProps } from "./PostList";

interface CommentProps {
  post: PostProps;
  getPost: (id: string) => Promise<void>;
}

const Comments = ({ post, getPost }: CommentProps) => {
  const [comment, setComment] = useState<string>("");
  const { user } = useContext(AuthContext);

  // console.log("post : ", post.comments?.slice(0).reverse());

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e; // 객체구조분해할당을 사용함. e에서 target추출했고, target에서 name과 value를 추출

    // const targetObj = {
    //   target: { name, value },
    // } // 단순히 targetObj 변수애 객체를 할당함.

    console.log(name, value);

    if (name === "comment") {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        const postRef = doc(db, "posts", post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updateDated: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
        }
        toast.success("댓글을 생성했습니다.", {
          position: "bottom-right",
          autoClose: 1500,
        });

        setComment("");

        getPost(post.id);
      }
    } catch (e: any) {
      console.log("에러 메세지 : ", e.message);
      toast.error(`댓글 작성이 실패했습니다. 에러 : ${e.message}`, {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
  };

  const handleDeleteComment = async (data: CommentInterface) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    // handleDeleteComment가 실행되면 window.confirm("해당 댓글을 삭제하시겠습니까?"); 가 실행된디ㅏ.
    // 이후 true, false값이 변수 confirm에 할당되게 되는 것입.

    try {
      if (confirm && post.id) {
        console.log("삭제할 data : ", data);

        const postRef = doc(db, "posts", post.id);

        await updateDoc(postRef, { comments: arrayRemove(data) });

        toast.success("댓글 삭제 성공!", {
          position: "bottom-right",
          autoClose: 1500,
        });

        // 삭제 후, 문서 업데이트
        await getPost(post.id);
      }
    } catch (e: any) {
      console.log("에러 메세지 : ", e.message);
      toast.error(`댓글 삭제에 실패했습니다. 에러 : ${e.message}`, {
        position: "bottom-right",
        autoClose: 1500,
      });
    }
  };

  return (
    <div className="comments">
      <form onSubmit={onSubmit} className="comments__form">
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          />
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comments__list">
        {/* 굳이 FireStore의 정렬 메서드를 사용하지 않고도 간단하게 배열을 역순(최신순)으로 정렬할 수 있음. */}
        {post.comments
          ?.slice(0)
          .reverse()
          .map((comment, idx) => (
            <div key={`comment_${idx}`} className="comment__box">
              <div className="comment__profile-info">
                <div className="comment__email">{comment.email}</div>
                <div className="comment__createdAt">{comment.createdAt}</div>
                {comment.uid === user?.uid && (
                  <div
                    className="comment__delete"
                    onClick={() => handleDeleteComment(comment)}>
                    삭제
                  </div>
                )}
              </div>
              <div className="comment__content">{comment.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
