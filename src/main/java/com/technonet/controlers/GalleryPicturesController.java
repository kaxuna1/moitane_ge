package com.technonet.controlers;

import com.technonet.Repository.*;
import com.technonet.model.Category;
import com.technonet.model.GalleryPicture;
import com.technonet.model.Session;
import com.technonet.model.User;
import com.technonet.staticData.PermisionChecks;
import com.technonet.staticData.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Created by kakha on 3/10/2017.
 */
@Controller
public class GalleryPicturesController {
    @RequestMapping("uploadGalleryPic/{id}")
    @ResponseBody
    public boolean uploadFile(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                              @PathVariable("id") long id,
                              @RequestParam("file") MultipartFile file) {
        Session session = sessionRepository.findOne(sessionId);
        if (!PermisionChecks.galleryManagement(session))
            return false;
        if (file.isEmpty()) {
            return false;
        } else {
            try {
                User user = userRepository.findOne(id);
                UUID uuid = UUID.randomUUID();
                BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
                int w = bufferedImage.getWidth();
                int h = bufferedImage.getHeight();
                if (w > 700) {
                    int newWidth = 700;
                    float scale = ((float) w / (float) newWidth);
                    float newHeight = (h / scale);
                    bufferedImage = Variables.resize(bufferedImage, newWidth, (int) newHeight);
                }
                int newWidth = 100;
                float scale = ((float) w / (float) newWidth);
                float newHeight = (h / scale);
                BufferedImage iconImg = Variables.resize(bufferedImage, newWidth, (int) newHeight);

                ByteArrayOutputStream baosIcon = new ByteArrayOutputStream();
                ImageIO.write(iconImg, "png", baosIcon);
                InputStream isIcon = new ByteArrayInputStream(baosIcon.toByteArray());


                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(bufferedImage, "png", baos);
                InputStream is = new ByteArrayInputStream(baos.toByteArray());

                Files.copy(is, Paths.get(Variables.appDir + "/images/galleryPics", uuid.toString()));
                Files.copy(isIcon, Paths.get(Variables.appDir + "/images/galleryPicLogos", uuid.toString()));
                galleryPictureRepo.save(new GalleryPicture(uuid.toString(), user, file.getContentType()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return true;
    }

    @RequestMapping("uploadGalleryPic")
    @ResponseBody
    public boolean uploadFile(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                              @RequestParam("file") MultipartFile file) {
        Session session = sessionRepository.findOne(sessionId);
        if (!session.isIsactive())
            return false;
        if (file.isEmpty()) {
            return false;
        } else {
            try {
                User user = session.getUser();
                UUID uuid = UUID.randomUUID();
                BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
                int w = bufferedImage.getWidth();
                int h = bufferedImage.getHeight();
                if (w > 700) {
                    int newWidth = 700;
                    float scale = ((float) w / (float) newWidth);
                    float newHeight = (h / scale);
                    bufferedImage = Variables.resize(bufferedImage, newWidth, (int) newHeight);
                }
                int newWidth = 100;
                float scale = ((float) w / (float) newWidth);
                float newHeight = (h / scale);
                BufferedImage iconImg = Variables.resize(bufferedImage, newWidth, (int) newHeight);

                ByteArrayOutputStream baosIcon = new ByteArrayOutputStream();
                ImageIO.write(iconImg, "png", baosIcon);
                InputStream isIcon = new ByteArrayInputStream(baosIcon.toByteArray());


                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(bufferedImage, "png", baos);
                InputStream is = new ByteArrayInputStream(baos.toByteArray());

                Files.copy(is, Paths.get(Variables.appDir + "/images/galleryPics", uuid.toString()));
                Files.copy(isIcon, Paths.get(Variables.appDir + "/images/galleryPicLogos", uuid.toString()));
                galleryPictureRepo.save(new GalleryPicture(uuid.toString(), user, file.getContentType()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return true;
    }

    @RequestMapping("/listgallery/{id}/{page}")
    @ResponseBody
    public Page<GalleryPicture> listGallery(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                                            @PathVariable("id") long id, @PathVariable("page") int page) {
        return galleryPictureRepo.findByUserAndActiveOrderByDate(userRepository.findOne(id), true, constructPageSpecification(page));
    }

    @RequestMapping(value = "userpicture/{pic}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public byte[] userPic(HttpServletResponse response, @CookieValue("projectSessionId") long sessionId, @PathVariable("pic") String pic) {
        Path path = Paths.get(Variables.appDir + "/images/galleryPics/" + pic);
        response.setContentType("image/jpeg");
        response.setHeader("Content-disposition", "attachment; filename=pic.jpg");
        try {
            byte[] data = Files.readAllBytes(path);

            return data;
        } catch (IOException e) {
            e.printStackTrace();
            try {
                return Files.readAllBytes(Paths.get(Variables.appDir + "/images/galleryPics/nopic.png"));
            } catch (IOException e1) {
                e1.printStackTrace();
                return null;
            }
        }
    }

    @RequestMapping(value = "userpicturelogo/{pic}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public byte[] userPicLogo(HttpServletResponse response, @CookieValue("projectSessionId") long sessionId, @PathVariable("pic") String pic) {

        Path path = Paths.get(Variables.appDir + "/images/galleryPicLogos/" + pic);
        response.setContentType("image/jpeg");
        response.setHeader("Content-disposition", "attachment; filename=pic.jpg");
        try {
            byte[] data = Files.readAllBytes(path);
            return data;
        } catch (IOException e) {
            e.printStackTrace();
            try {

                return Files.readAllBytes(Paths.get(Variables.appDir + "/images/galleryPics/nopic.png"));
            } catch (IOException e1) {
                e1.printStackTrace();
                return null;
            }
        }
    }


    private Pageable constructPageSpecification(int pageIndex) {
        return new PageRequest(pageIndex, 40);
    }


    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DocumentsRepo documentsRepo;
    @Autowired
    private DocTypeRepo docTypeRepo;
    @Autowired
    private GalleryPictureRepo galleryPictureRepo;
}
