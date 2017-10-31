package com.technonet.controlers;

import com.technonet.Repository.*;
import com.technonet.model.*;
import com.technonet.staticData.PermisionChecks;
import com.technonet.staticData.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

/**
 * Created by kakha on 3/5/2017.
 */
@Controller
public class StorageController {
    @RequestMapping("upload/{id}")
    @ResponseBody
    public boolean uploadFile(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                              @PathVariable("id") long id,
                              @RequestParam("file") MultipartFile file,
                              @RequestParam("category") long category,
                              @RequestParam("docType") long docType) {

        Session session = sessionRepository.findOne(sessionId);
        if (!PermisionChecks.FileManagement(session))
            return false;
        if (file.isEmpty()) {
            return false;
        } else {
            try {

                User user = userRepository.findOne(id);
                Category category1=categoryRepo.findOne(category);
                String originalName = file.getOriginalFilename();
                UUID uuid = UUID.randomUUID();
                Files.copy(file.getInputStream(), Paths.get(Variables.appDir + "/docs", uuid.toString()));
                Document doc = new Document(originalName, user, uuid.toString(), file.getContentType(), docTypeRepo.findOne(docType));
                documentsRepo.save(doc);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return true;
    }

    @RequestMapping("uploadProfilePic/{id}")
    @ResponseBody
    public boolean uploadProfilePic(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                              @PathVariable("id") long id,
                              @RequestParam("file") MultipartFile file) {

        Session session = sessionRepository.findOne(sessionId);
        if (!PermisionChecks.FileManagement(session))
            return false;
        if (file.isEmpty()) {
            return false;
        } else {
            try {

                User user = userRepository.findOne(id);
                String originalName = file.getOriginalFilename();
                UUID uuid = UUID.randomUUID();
                BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
                //bufferedImage=Variables.getScaledInstance(bufferedImage,500,500,new RenderingHints(),false);
                int w = bufferedImage.getWidth();
                int h = bufferedImage.getHeight();
                if(w>500){
                    int newWidth=500;
                    float scale=((float)w/(float)newWidth);
                    float newHeight=  (h/scale);
                    bufferedImage=Variables.resize(bufferedImage,newWidth,(int)newHeight);
                }


                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(bufferedImage, "png", baos);
                InputStream is = new ByteArrayInputStream(baos.toByteArray());

                Files.copy(is, Paths.get(Variables.appDir + "/images/profilePics", uuid.toString()));
                user.setProfilePic(uuid.toString());
                userRepository.save(user);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return true;
    }
    @RequestMapping("/profilepicupdate")
    @ResponseBody
    public boolean profilepicupdate(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                                    @RequestParam("pic") String pic){


        Session session = sessionRepository.findOne(sessionId);
        if (!session.isIsactive())
            return false;
        if (pic.isEmpty()) {
            return false;
        } else {
            try{
                User user = session.getUser();

                UUID uuid = UUID.randomUUID();
                String base64Image = pic.split(",")[1];
                byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
                BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(imageBytes));
                int w = bufferedImage.getWidth();
                int h = bufferedImage.getHeight();
                if(w>500){
                    int newWidth=500;
                    float scale=((float)w/(float)newWidth);
                    float newHeight=  (h/scale);
                    bufferedImage=Variables.resize(bufferedImage,newWidth,(int)newHeight);
                }
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(bufferedImage, "png", baos);
                InputStream is = new ByteArrayInputStream(baos.toByteArray());

                Files.copy(is, Paths.get(Variables.appDir + "/images/profilePics", uuid.toString()));
                user.setProfilePic(uuid.toString());
                userRepository.save(user);
            }catch (Exception e){

            }

        }

        return true;
    }

    @RequestMapping("uploadProfilePic")
    @ResponseBody
    public boolean uploadProfilePic(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
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
                if(w>500){
                    int newWidth=500;
                    float scale=((float)w/(float)newWidth);
                    float newHeight=  (h/scale);
                    bufferedImage=Variables.resize(bufferedImage,newWidth,(int)newHeight);
                }
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                ImageIO.write(bufferedImage, "png", baos);
                InputStream is = new ByteArrayInputStream(baos.toByteArray());

                Files.copy(is, Paths.get(Variables.appDir + "/images/profilePics", uuid.toString()));
                user.setProfilePic(uuid.toString());
                userRepository.save(user);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return true;
    }

    @RequestMapping("upload")
    @ResponseBody
    public boolean uploadFileForMe(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                                   @RequestParam("file") MultipartFile file, @RequestParam("category") long category,
                                   @RequestParam("docType") long docType) {

        Session session = sessionRepository.findOne(sessionId);
        if (!session.isIsactive())
            return false;
        if (file.isEmpty()) {
            return false;
        } else {
            try {
                User user = session.getUser();
                String originalName = file.getOriginalFilename();
                UUID uuid = UUID.randomUUID();
                Files.copy(file.getInputStream(), Paths.get(Variables.appDir + "/docs", uuid.toString()));
                Document doc = new Document(originalName, user, uuid.toString(), file.getContentType(), docTypeRepo.findOne(docType));
                documentsRepo.save(doc);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return true;
    }

    @RequestMapping("listdocs/{id}")
    @ResponseBody
    public Page<Document> getDocs(@CookieValue(value = "projectSessionId", defaultValue = "0") long sessionId,
                                  @PathVariable("id") long id, @RequestParam("page") int page) {
        Session session = sessionRepository.findOne(sessionId);
        if (session.isIsactive() && PermisionChecks.isAdmin(session.getUser())) {
            return documentsRepo.findByUserAndActiveOrderByDateDesc(userRepository.findOne(id), true, constructPageSpecification(page));
        } else {
            return null;
        }
    }

    @RequestMapping("doc/{id}")
    @ResponseBody
    public void doc(HttpServletResponse response, @CookieValue("projectSessionId") long sessionId, @PathVariable("id") long id) {
        Session session = sessionRepository.findOne(sessionId);
        Document doc = documentsRepo.findOne(id);
        if (session.isIsactive() && (PermisionChecks.isAdmin(session.getUser()) || doc.getUser().getId() == session.getUser().getId())) {
            File file = new File(Variables.appDir + "/docs/" + doc.getFileName());
            Path path = Paths.get(Variables.appDir + "/docs/" + doc.getFileName());
            try {
                byte[] data = Files.readAllBytes(path);
                response.setContentType(doc.getExtension());
                response.setHeader("filename", doc.getName());
                response.setHeader("Content-disposition", "attachment; filename=" + doc.getName());
                response.getOutputStream().write(data);
                response.flushBuffer();
                //return data;
            } catch (IOException e) {
                e.printStackTrace();
                // return null;
            }
        }//else //return null;
    }

    @RequestMapping("profilePic/{id}")
    @ResponseBody
    public byte[] profilePic(HttpServletResponse response, @PathVariable("id") long id) {
        User user = userRepository.findOne(id);
        Path path;
        if(user.getProfilePic()==null){
            path = Paths.get(Variables.appDir+"/images/profilePics/noPhoto.jpg");
        }else{
            path = Paths.get(Variables.appDir+"/images/profilePics/" + user.getProfilePic());
        }
        try {
            byte[] data = Files.readAllBytes(path);
            response.setContentType("image/jpeg");
            response.setHeader("filename", "profilePic.jpg");
            response.setHeader("Content-disposition", "attachment; filename=profilePic.jpg");
            return data;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
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
    private CategoryRepo categoryRepo;
}
