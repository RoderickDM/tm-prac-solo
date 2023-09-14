<?php
class Configuration
{
    public $configuration_aid;
    public $configuration_is_active;
    public $configuration_title;
    public $configuration_description;
    public $configuration_created_at;
    public $configuration_updated_at;

    public $employee_aid;

    public $configuration_start;
    public $configuration_total;
    public $configuration_search;

    public $connection;
    public $lastInsertedId;
    public $tblConfiguration;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblConfiguration = "parrot_configuration";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblConfiguration} ";
            $sql .= "( configuration_title, "; 
            $sql .= "configuration_description, ";
            $sql .= "configuration_is_active, ";
            $sql .= "configuration_created_at, ";
            $sql .= "configuration_updated_at ) values ( ";
            $sql .= ":configuration_title, "; 
            $sql .= ":configuration_description, ";
            $sql .= ":configuration_is_active, ";
            $sql .= ":configuration_created_at, ";
            $sql .= ":configuration_updated_at ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "configuration_title" => $this->configuration_title,
                "configuration_description" => $this->configuration_description,
                "configuration_is_active" => $this->configuration_is_active,
                "configuration_created_at" => $this->configuration_created_at,
                "configuration_updated_at" => $this->configuration_updated_at,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblConfiguration} ";
            $sql .= "order by configuration_is_active desc, ";
            $sql .= "configuration_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblConfiguration} ";
            $sql .= "order by configuration_is_active desc, ";
            $sql .= "configuration_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->configuration_start - 1,
                "total" => $this->configuration_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

     //search
     public function search()
     {
         try {
             $sql = "select ";
             $sql .= "* ";
             $sql .= "from {$this->tblConfiguration} ";
             $sql .= "where configuration_title like :search ";
             $sql .= "order by configuration_is_active desc, ";
             $sql .= "configuration_title asc ";
             $query = $this->connection->prepare($sql);
             $query->execute([
                 "search" => "%{$this->configuration_search}%",
             ]);
         }  catch (PDOException $ex) {
             $query = false;
         }
         return $query;
         
     }
 

    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tblConfiguration} ";
            $sql .= "where configuration_aid = :configuration_aid ";
            $sql .= "order by configuration_title asc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "configuration_aid" => $this->configuration_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // update
    public function update()
    {
        try {
            $sql = "update {$this->tblConfiguration} set ";
            $sql .= "configuration_title = :configuration_title, ";
            $sql .= "configuration_description = :configuration_description, ";
            $sql .= "configuration_updated_at = :configuration_updated_at ";
            $sql .= "where configuration_aid = :configuration_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "configuration_title" => $this->configuration_title,
                "configuration_description" => $this->configuration_description,
                "configuration_updated_at" => $this->configuration_updated_at,
                "configuration_aid" => $this->configuration_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // active
    public function active()
    {
        try {
            $sql = "update {$this->tblConfiguration} set ";
            $sql .= "configuration_is_active = :configuration_is_active, ";
            $sql .= "configuration_updated_at = :configuration_updated_at ";
            $sql .= "where configuration_aid = :configuration_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "configuration_is_active" => $this->configuration_is_active,
                "configuration_updated_at" => $this->configuration_updated_at,
                "configuration_aid" => $this->configuration_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tblConfiguration} ";
            $sql .= "where configuration_aid = :configuration_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "configuration_aid" => $this->configuration_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
 
    // name
    public function checkName()
    {
        try {
            $sql = "select configuration_title from {$this->tblConfiguration} ";
            $sql .= "where configuration_title = :configuration_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "configuration_title" => "{$this->configuration_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
