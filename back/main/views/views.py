from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from main.serializers import PostModelSerializer,CommentSerializer,ProductSerializer, PostLikeModelSerializer
from main.models import Post,Comment,Category,Product, PostLike
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response

class PostList(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostModelSerializer(posts, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def post_create(request):
    serializer = PostModelSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save(owner = request.user,category = Category.objects.get(name = request.data["name"]))
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status= status.HTTP_400_BAD_REQUEST)


class PostDetail(generics.RetrieveAPIView):
  queryset = Post.objects.all()
  serializer_class = PostModelSerializer

@api_view(['PUT','DELETE'])
def post_update(request,pk):
    try:
        task=Post.my_post.for_user(owner=request.user).get(pk=pk)
    except Post.DoesNotExist:
        return Response(status= status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = PostModelSerializer(instance = task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method=="DELETE":
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 100

class CommentListView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Comment.post_comment.for_post(
            post=Post.objects.get(id=self.kwargs["pk"])
        )

class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,JSONWebTokenAuthentication,)

    def perform_create(self, serializer):
        serializer.save(owner = self.request.user,post = Post.objects.get(id = self.kwargs["pk"]))

class CommentDetailView(generics.RetrieveAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentUpdateView(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    # def get_queryset(self):
    #     return Comment.post_comment.for_user(
    #         self.request.user,
    #         comment=Comment.objects.get(id=self.kwargs["pk"])
    #     )

class CommentDeleteView(generics.DestroyAPIView,LoginRequiredMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    #
    # def get_queryset(self):
    #     return Comment.post_comment.for_user(
    #         self.request.user,
    #         comment = Comment.objects.get(id = self.kwargs["pk"])
    #     )

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductCreateView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,IsAdminUser,)
    authentication_classes = (TokenAuthentication,)


class ProductUpdateView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, IsAdminUser,)
    authentication_classes = (TokenAuthentication,)


class ProductDeleteView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated, IsAdminUser,)
    authentication_classes = (TokenAuthentication,)

class PostLike_list(APIView):
    authentication_classes = (TokenAuthentication, )

    def get(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            return Response(status.HTTP_404_NOT_FOUND)


        likes = PostLike.objects.filter(Post = Post.objects.get(id=pk))
        serializer = PostLikeModelSerializer(likes, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        serializer = PostLikeModelSerializer(data=request.data)

        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            return Response(status.HTTP_404_NOT_FOUND)


        postlikes = PostLike.objects.filter(user=request.user, Post=Post.objects.get(id=pk))

        try:
            if (serializer.is_valid() and len(postlikes)==0):
                serializer.save(user=request.user, Post=post)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            Response(status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        postLike = PostLike.objects.filter(user=request.user, Post=Post.objects.get(id=pk))
        postLike.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class PostLike_list(APIView):
    authentication_classes = (TokenAuthentication, )

    def get(self, request, pk):
        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            return Response(status.HTTP_404_NOT_FOUND)


        likes = PostLike.objects.filter(Post = Post.objects.get(id=pk))
        serializer = PostLikeModelSerializer(likes, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        serializer = PostLikeModelSerializer(data=request.data)

        try:
            post = Post.objects.get(id=pk)
        except Post.DoesNotExist:
            return Response(status.HTTP_404_NOT_FOUND)


        postlikes = PostLike.objects.filter(user=request.user, Post=Post.objects.get(id=pk))

        try:
            if (serializer.is_valid() and len(postlikes)==0):
                serializer.save(user=request.user, Post=post)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            Response(status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        postLike = PostLike.objects.filter(user=request.user, Post=Post.objects.get(id=pk))
        postLike.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PostByCategoryView(generics.ListAPIView):
  serializer_class = PostModelSerializer
  def get_queryset(self):
    return Post.my_post.category(category=Category.objects.get(id=self.kwargs["pk"]))
